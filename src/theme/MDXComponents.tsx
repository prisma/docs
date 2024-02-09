import React from 'react'
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents'

// Import components we'd like to use across Docs
import Subsections from '@theme/DocCardList' // DocCardList renamed to Subsections for backwards compat

// Import custom components
import Admonition from '@site/src/components/shortcodes/admonition'
import ButtonLink from '@site/src/components/shortcodes/button'
import TopBlock from '@site/src/components/shortcodes/topBlock'
import CodeWithResult from '@site/src/components/shortcodes/codeWithResult'
import FileWithIcon from '@site/src/components/shortcodes/fileWithIcon'
import FootNote from '@site/src/components/shortcodes/footnote'
import TabbedContent from '@site/src/components/shortcodes/tabbedContent'
import Tip from '@site/src/components/shortcodes/tip'
import CodeBlock from '@site/src/components/shortcodes/codeBlock'
import ParallelBlocks from '@site/src/components/shortcodes/parallelBlocks'
import SwitchTech from '@site/src/components/shortcodes/switchTech'
import Shortcodes from '@site/src/components/shortcodes'
import Quiz from '@site/src/components/shortcodes/quiz'
import * as GettingStartedComponents from '@site/src/components/shortcodes/gettingstarted'
import CockroachDBgradient from '../icons/technologies/CockroachDBgradient'
import Database from '../icons/Database'
import MongoDBSimple from '../icons/technologies/MongoDBSimple'
import MySQLSimple from '../icons/technologies/MySQLSimple'
import PlanetScale from '../icons/technologies/PlanetScale'
import PostgresSQLSimple from '../icons/technologies/PostgresSQLSimple'
import SQLServer from '../icons/technologies/SQLServer'

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // add our custom components
  ...GettingStartedComponents,
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
  CockroachDBgradient,
  Database,
  MongoDBSimple,
  MySQLSimple,
  PlanetScale,
  PostgresSQLSimple,
  SQLServer,
}
