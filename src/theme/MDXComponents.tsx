import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// Import components we'd like to use across Docs
import Subsections from '@theme/DocCardList'; // DocCardList renamed to Subsections for backwards compat

// Import custom components
import Admonition from '@site/src/components/shortcodes/admonition'
import ButtonLink from '@site/src/components/shortcodes/button'
import TopBlock from '@site/src/components/shortcodes/topBlock'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // add our custom components
  Admonition,
  ButtonLink,
  Subsections,
  TopBlock,
};