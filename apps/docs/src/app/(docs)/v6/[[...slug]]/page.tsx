import { getPageImage, getSource, sourceV6 } from '@/lib/source';
import { notFound, redirect } from 'next/navigation';

import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';

import { createRelativeLink } from 'fumadocs-ui/mdx';

import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import { VersionBanner } from '@/components/version-banner';
import { isValidVersion, LATEST_VERSION } from '@/lib/version';

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  PageLastUpdate,
} from '@/components/layout/notebook/page';

interface PageParams {
  version: string;
  slug?: string[];
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const source = sourceV6;
  const page = source.getPage(slug);
  if (!page) redirect('/v6');

  const MDX = page.data.body;

  return (
    <DocsPage
      tableOfContent={{ style: 'normal' }}
      toc={page.data.toc}
      full={page.data.full}
    >
      <div className="flex flex-row items-center gap-4 pt-2 pb-6 justify-between">
        <DocsTitle>{page.data.title}</DocsTitle>
        <div className="flex flex-row gap-2 items-center">
          <LLMCopyButton pageUrl={page.url} />
          <ViewOptions
            pageUrl={page.url}
            githubUrl={`https://github.com/prisma/temp-docs-rewrite/blob/main/content/docs/${page.path}`}
          />
        </div>
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
            // @ts-ignore - _pageContext is a special prop used by our components
            _pageContext: { folder: page.slugs.join('/'), version: 'v6' },
          })}
        />
      </DocsBody>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-t pt-6 text-sm">
        <EditOnGitHub
          href={`https://github.com/prisma/temp-docs-rewrite/edit/main/content/docs/${page.path}`}
        />
        {(page.data as { lastModified?: Date }).lastModified && (
          <PageLastUpdate
            date={(page.data as { lastModified: Date }).lastModified}
          />
        )}
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return sourceV6.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = sourceV6;

  let page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: page.data.image || getPageImage(page).url,
    },
  };
}
