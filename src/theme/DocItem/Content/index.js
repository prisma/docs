import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import TopSection from "@site/src/components/topSection";
import { useLocation } from "@docusaurus/router";
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const { frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();
  const location = useLocation();
  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
          {(frontMatter.langSwitcher || frontMatter.dbSwitcher) && (
            <section className="top-section">
              <TopSection
                location={location}
                langSwitcher={frontMatter?.langSwitcher}
                dbSwitcher={frontMatter?.dbSwitcher}
                slug={frontMatter?.slugSwitch}
              />
            </section>
          )}
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
