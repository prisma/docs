import React from 'react'
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'

// Import components we'd like to use across Docs
import Subsections from '@theme/DocCardList' // DocCardList renamed to Subsections for backwards compat

// Import custom components
import Admonition from '@site/src/components/shortcodes/admonition'
import ButtonLink from '@site/src/components/shortcodes/button'
import TopBlock from '@site/src/components/shortcodes/topBlock'
import CodeWithResult from '../components/shortcodes/codeWithResult'
import FileWithIcon from '../components/shortcodes/fileWithIcon'
import FootNote from '../components/shortcodes/footnote'
import TabbedContent from '../components/shortcodes/tabbedContent'
import Tip from '../components/shortcodes/tip'
import CodeBlock from '../components/shortcodes/codeBlock'
import ParallelBlocks from '../components/shortcodes/parallelBlocks'
import SwitchTech from '../components/shortcodes/switchTech'
import Shortcodes from '../components/shortcodes'
import Quiz from '../components/shortcodes/quiz'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // add our custom components
  Admonition,
  ButtonLink,
  CodeWithResult,
  FileWithIcon,
  FootNote,
  Subsections,
  TabbedContent,
  Tip,
  TopBlock,
  CodeBlock,
  ParallelBlocks,
  SwitchTech,
  Quiz,
  NavigationLinksContainer: Shortcodes.NavigationLinksContainer,
  AlgoliaTerm: Shortcodes.AlgoliaTerm,
}
