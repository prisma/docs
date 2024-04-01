import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';

// Import components we'd like to use across Docs
import Subsections from './DocCardList' // DocCardList renamed to Subsections for backwards compat
import Admonition from '@theme/Admonition';
import TabbedContent from '@theme/Tabs'; // Tabs renamed to TabbedContent for backwards compat
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import CollapseBox from '@site/src/components/collapsible';
import TopSection from '@site/src/components/topSection';
import { useLocation } from '@docusaurus/router';

// TODO: do we want to fix this?
const TopBlock: React.FC<React.PropsWithChildren> = ({ children, langSwitcher, dbSwitcher, slug, title }: any) => {
  const location = useLocation()
  return (
    <>
      <section className="top-section">
        {title && <header><h1>{title}</h1></header>}
        <TopSection
          location={location}
          langSwitcher={langSwitcher}
          dbSwitcher={dbSwitcher}
          slug={slug}
        />
      </section>
      {children}
    </>
  )
}

// TODO: we should fix this
const CodeWithResult: React.FC<{ children: React.ReactElement[] }> = ({ children }) => {
  return <>
    <p>{children[0]}</p>
    <p>{children[1]}</p>
  </>
}

// TODO: we should fix this
const SwitchTech: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <p>{children}</p>
}

const ParallelBlocks: React.FC<React.PropsWithChildren> = ({ children }) => {
  const childArray = React.Children.toArray(children).map(child => {
    if (React.isValidElement(child)) {
      return <div className='col col--6'>
        <b>{child.props.content}</b>
        <div>{child}</div>
      </div>
    } else {
      return <div className='col col--6'>
        <div>{child}</div>
      </div>
    }
  });

  return <div className='container'>
    <div className='row'>
      {childArray}
    </div>
  </div>
}

type ButtonColor = 'red' | 'green' | 'grey' | 'grey-bg' | 'dark'
interface ButtonProps {
  href?: string
  target?: string
  block?: boolean
  color?: ButtonColor
  disabled?: boolean
  arrow?: boolean
  onClick?: any
  arrowLeft?: boolean
  theme?: any
}

// TODO: we should fix this
const ButtonLink: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, href }) => {
  return <Link to={href}>{children}</Link>
}

// TODO: we should fix this
const NavigationLinksContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Subsections,
  Admonition,
  TabbedContent,
  details: (props: any) => <CollapseBox {...props} />,
  TabItem,
  Link,
  TopBlock,
  CodeWithResult,
  SwitchTech,
  ParallelBlocks,
  ButtonLink,
  NavigationLinksContainer,
};