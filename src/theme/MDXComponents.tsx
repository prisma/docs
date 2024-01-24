import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

import Admonition from '@site/src/components/shortcodes/admonition'
import ButtonLink from '@site/src/components/shortcodes/button'
import TopBlock from '@site/src/components/shortcodes/topBlock'
import Subsections from '@site/src/components/shortcodes/subSections';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // add our custom components
  Admonition,
  ButtonLink,
  Subsections,
  TopBlock,
};