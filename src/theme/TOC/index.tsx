import Dropdown from '@site/src/components/content-dropdown';
import { Icon } from '@site/src/components/Icon';
import TOCItems from '@theme/TOCItems';
import clsx from 'clsx';
import React, { ReactNode, useState } from 'react';

import type {Props} from '@theme/TOC';

import styles from './styles.module.css';
import { anthropic, cursor, openai, t3 } from '../TOCItems/icons';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';
const getMarkdown = async (link: string) => {
  const response = await fetch(link);
  const mdx = await response.text();
  navigator.clipboard.writeText(mdx);
  return mdx;
}

export default function TOC({className, metadata, ...props}: Props & {metadata: any }): ReactNode {
  const url = `https://prisma.io/docs${metadata.slug}`;
  const externalProps = {
    target: '_blank',
    rel: 'opener noreferrer'
  }
  const [text, setText] = useState<string>("Open in")
  const markdown = metadata.editUrl.replace("github", "raw.githubusercontent").replace("/blob", "").replace("/tree", "");
  const getMDX = () => {
    getMarkdown(markdown);
    setText("Copied!");
    setTimeout(() => {
      setText("Open in")
    }, 1200)
  }
  return (
    <div className={styles.tableOfContentsWrapper}>
      <Dropdown anchorText={text} items={[
        <div key="cp-markdown" onClick={() => getMDX()}><Icon btn="left" icon="fa-brands fa-markdown" size='16px'/>Copy as Markdown</div>,
        <a key="open-claude" href={`https://claude.ai/new?q=Read%20${url}%20so%20I%20can%20ask%20questions%20about%20it.`} {...externalProps}>
          <Icon btn="left" customicon={anthropic} size='16px'/>
          Open in Claude
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a key="open-chatgpt" href={`https://chat.openai.com/?q=Read%20${url}%20so%20I%20can%20ask%20questions%20about%20it.`} {...externalProps}>
          <Icon btn="left" customicon={openai} size='16px'/>
          Open in ChatGPT
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a key="open-t3chat" href={`https://www.t3.chat/new?q=Read%20${url}%20so%20I%20can%20ask%20questions%20about%20it.`} {...externalProps}>
          <Icon btn="left" customicon={t3} size='16px'/>
          Open in T3.chat
          <Icon icon="fa-regular fa-arrow-up-right" size="inherit" btn="right"/>
        </a>,
        <a key="open-github" href={metadata.editUrl} {...externalProps}>
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
