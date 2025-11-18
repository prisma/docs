#!/usr/bin/env node

/**
 * CI Script to detect redirect loops in _redirects file
 * Usage: node scripts/check-redirect-loops.js
 * Exit code: 0 if no loops found, 1 if loops detected
 */

const fs = require('fs');
const path = require('path');

const REDIRECTS_FILE = path.join(__dirname, '../static/_redirects');
const MAX_REDIRECT_DEPTH = 10;

function parseRedirects(content) {
  const lines = content.split('\n');
  const redirects = new Map();

  for (const line of lines) {
    // Skip comments, empty lines, and the footer
		if (line.trim().startsWith('#') || line.trim() === '' || line.trim().includes('# NO REDIRECTS BELOW')) {
      continue;
    }

    // Parse redirect line: source destination [status]
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const source = parts[0];
      const destination = parts[1];
      
      // Skip external redirects (http/https)
      if (destination.startsWith('http://') || destination.startsWith('https://')) {
        continue;
      }

      // Normalize paths by removing splat patterns
      // Keep hash fragments in source to detect loops like /path#hash → /docs/path → /path
      const normalizedSource = source.replace(/\*/g, '');
      const baseSource = normalizedSource.replace(/#.*$/, ''); // Base path without hash
      const normalizedDest = destination.replace(/:splat$/, '').replace(/#.*$/, '');

      // Store both the full source (with hash) and base source
      redirects.set(normalizedSource, normalizedDest);
      
      // If source has a hash, also check if base path redirects create a loop
      if (normalizedSource.includes('#')) {
        // This allows us to detect: /path#hash → /docs/path → /path (loop!)
        if (!redirects.has(baseSource)) {
          redirects.set(baseSource, normalizedDest);
        }
      }
    }
  }

  return redirects;
}

function findRedirectChain(source, redirects, visited = new Set()) {
  const chain = [source];
  let current = source;
  let depth = 0;

  while (depth < MAX_REDIRECT_DEPTH) {
    if (visited.has(current)) {
      // Loop detected!
      const loopStart = chain.indexOf(current);
      return {
        isLoop: true,
        chain: chain.slice(loopStart),
        fullChain: chain
      };
    }

    visited.add(current);
    const next = redirects.get(current);

    if (!next) {
      // End of chain, no loop
      return { isLoop: false, chain };
    }

    chain.push(next);
    current = next;
    depth++;
  }

  // Max depth reached - potential infinite loop
  return {
    isLoop: true,
    chain,
    fullChain: chain,
    reason: 'max_depth_exceeded'
  };
}

function checkForLoops() {
  console.log('🔍 Checking for redirect loops...\n');

  if (!fs.existsSync(REDIRECTS_FILE)) {
    console.error(`❌ Error: ${REDIRECTS_FILE} not found`);
    process.exit(1);
  }

  const content = fs.readFileSync(REDIRECTS_FILE, 'utf-8');
  const redirects = parseRedirects(content);

  console.log(`📋 Found ${redirects.size} internal redirects to check\n`);

  const loops = [];
  const checked = new Set();

  for (const [source] of redirects) {
    if (checked.has(source)) continue;

    const result = findRedirectChain(source, redirects);
    
    if (result.isLoop) {
      loops.push({
        source,
        ...result
      });
      
      // Mark all items in the loop as checked
      result.fullChain.forEach(item => checked.add(item));
    } else {
      // Mark all items in the chain as checked
      result.chain.forEach(item => checked.add(item));
    }
  }

  if (loops.length === 0) {
    console.log('✅ No redirect loops detected!');
    process.exit(0);
  } else {
    console.error(`❌ Found ${loops.length} redirect loop(s):\n`);
    
    loops.forEach((loop, index) => {
      console.error(`Loop ${index + 1}:`);
      console.error(`  Chain: ${loop.chain.join(' → ')}`);
      if (loop.reason === 'max_depth_exceeded') {
        console.error(`  Reason: Exceeded maximum redirect depth (${MAX_REDIRECT_DEPTH})`);
      }
      console.error('');
    });

    process.exit(1);
  }
}

// Run the check
checkForLoops();
