import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
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
          {frontMatter.completion_time && (
            <div className="completion-time-wrapper">
              <div className="completion-time-container">{frontMatter.completion_time}</div>
            </div>
          )}
        </header>
      )}
      <MDXContent>
        {children}{" "}
        {frontMatter.include_cta && (
          <div>
            <br />
            <h2>Stay connected with Prisma</h2>
            <p>
              Continue your Prisma journey by connecting with our active community. Stay informed,
              get involved, and collaborate with other developers:
              <ul>
                <li>
                  <a href="https://twitter.com/intent/follow?screen_name=@prisma" target="_blank">
                    Follow us on X
                  </a>{" "}
                  for announcements, live events and useful tips.
                </li>
                <li>
                  <a href="https://twitter.com/intent/follow?screen_name=@prisma" target="_blank">
                    Join our Discord
                  </a>{" "}
                  to ask questions, talk to the community, and get active support through
                  conversations.
                </li>
                <li>
                  <a href="https://twitter.com/intent/follow?screen_name=prisma" target="_blank">
                    Subscribe on YouTube
                  </a>{" "}
                  for tutorials, demos, and streams.
                </li>
                <li>
                  <a href="https://twitter.com/intent/follow?screen_name=@prisma" target="_blank">
                    Engage on GitHub
                  </a>{" "}
                  by starring the repository, [reporting issues](/), or contributing to an issue.
                </li>
              </ul>
              We genuinely value your involvement and look forward to having you as part of our
              community!
            </p>
          </div>
        )}
      </MDXContent>
    </div>
  );
}
