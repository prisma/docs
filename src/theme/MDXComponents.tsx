import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// Import components we'd like to use across Docs
import Subsections from '@theme/DocCardList' // DocCardList renamed to Subsections for backwards compat
import Admonition from '@theme/Admonition';
import TabbedContent from '@theme/Tabs'; // Tabs renamed to TabbedContent for backwards compat
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

// do we want to fix this?
const TopBlock: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <p>{children}</p>
}

// we should fix this
const CodeWithResult: React.FC<{ children: React.ReactElement[] }> = ({ children }) => {
    return <>
        <p>{children[0]}</p>
        <p>{children[1]}</p>
    </>
}

// we should fix this
const SwitchTech: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <p>{children}</p>
}

const ParallelBlocks: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <>{children}</>
}

export default {
    // Re-use the default mapping
    ...MDXComponents,
    Subsections,
    Admonition,
    TabbedContent,
    TabItem,
    Link,
    TopBlock,
    CodeWithResult,
    SwitchTech,
    ParallelBlocks,
};