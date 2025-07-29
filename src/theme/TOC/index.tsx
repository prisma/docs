import TOCItems from '@theme/TOCItems';
import clsx from 'clsx';
import React, { type ReactNode } from 'react';
import Dropdown from '@site/src/components/content-dropdown';
import { Icon } from '@site/src/components/Icon';

import type {Props} from '@theme/TOC';

import styles from './styles.module.css';
import { anthropic, cursor, openai } from '../TOCItems/icons';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function TOC({className, metadata, ...props}: Props & {metadata: any }): ReactNode {
  return (
    <div className={styles.tableOfContentsWrapper}>
      <Dropdown anchorText="Open in" items={[
        <span><Icon btn="left" icon="fa-brands fa-markdown" size='16px'/>Copy as Markdown</span>,
        <a href="/">
          <Icon btn="left" customicon={anthropic} size='16px'/>
          Open in Claude
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a href="/">
          <Icon btn="left" customicon={openai} size='16px'/>
          Open in ChatGPT
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a href="/">
          <Icon btn="left" customicon={cursor} size='16px'/>
          Open in Cursor
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a href={metadata.editUrl} target='__blank' rel='openeer noreferrer'>
          <Icon btn="left" icon="fa-brands fa-github" size='16px'/>
          Edit in GitHub
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>
      ]} />
      <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
        <TOCItems
          {...props}
          linkClassName={LINK_CLASS_NAME}
          linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
          />
      </div>
    </div>
  );
}
