import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Icon } from "@site/src/components/Icon";
import { CommunityLinksData, get_help, how_do_i, ProductLinkData, tabs } from "@site/src/data/indexData";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import { useRef, useState } from "react";

import Badge from "../components/button/Badge";
import Button from "../components/button/Button";
import { SquareLogo } from "../components/GettingStarted";
import { Tooltip } from "../components/tooltip/Tooltip";
import CodeBlock from "../theme/CodeBlock";
import styles from "./index.module.scss";
import { CardHeading, HomepageCard } from "../components/ProductBlock";

function HomepageProductCards() {
  return (
    <div className={styles.homepageTopSection}>
      <div className={styles.productCardsWrapper}>
        <Heading as="h3" className={styles.h3}>Products</Heading>
        <div className={styles.productCards}>
          {Object.keys(ProductLinkData).map((e: keyof typeof ProductLinkData) => {
            const cardHeader =
              <CardHeading
                eyebrow={ProductLinkData[e].eyebrow}
                title={ProductLinkData[e].title}
                icon={ProductLinkData[e].icon}
              />;
            return (
              <HomepageCard
                indigo={e.startsWith("i_")}
                heading={cardHeader}
                body={ProductLinkData[e].description}
                link={ProductLinkData[e].link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HomepageHowDoISection() {
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const howRef = useRef<any>(null);

  const visibleCards = how_do_i.slice(0, 3);
  const hiddenCards = how_do_i.slice(3);

  const location = useLocation();

  return (
    <div className={styles.howDoISection} ref={howRef}>
      <Heading as="h3" className={styles.h3}>
        How do I...
      </Heading>
      <div className={styles.howGrid}>
        {visibleCards.map((e: any) => (
          <div className={styles.howItem}>
            <Link to={`${e.url}${location.search}`}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
            </Link>
            {((e.tags && e.tags.length) || e.time) && <div className={styles.footer}>
              {e.tags.length && <div className={styles.tags}>
                {e.tags.map((tag: any) => <Badge variant="primary" key={tag} color="gray" size="sm" label={tag} />)}
              </div>}
              {e.time && <div className={styles.readTime}>
                <Icon size="24px" color="var(--gray-500)" icon="fa-regular fa-clock" btn="left" />
                <span>{e.time} min. read</span>
              </div>}
            </div>}
          </div>
        ))}
        {seeMore && hiddenCards.map((e: any, idx: number) => (
          <div className={clsx(styles.howItem, styles.fadeIn)} style={{ animationDelay: `${100 * idx}ms` }}>
            <Link to={`${e.url}${location.search}`}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
            </Link>
            {((e.tags && e.tags.length) || e.time) && <div className={styles.footer}>
              {e.tags.length && <div className={styles.tags}>
                {e.tags.map((tag: any) => <Badge variant="primary" key={tag} color="gray" size="sm" label={tag} />)}
              </div>}
              {e.time && <div className={styles.readTime}>
                <Icon size="24px" color="var(--gray-500)" icon="fa-regular fa-clock" btn="left" />
                <span>{e.time} min. read</span>
              </div>}
            </div>}
          </div>
        ))}
      </div>
      <div
        className={clsx(styles.seeMore, seeMore && styles.clicked)}
        onClick={() => {
          setSeeMore(!seeMore)
          howRef.current.scrollIntoView({ behavior: "smooth", offset: 80 });
        }}
      >
        <span>See {seeMore ? `less` : `more`}</span>
        <Icon icon={`fa-regular fa-arrow-${seeMore ? `up` : `down`}`} size="inherit" color="inherit" btn="right" />
      </div>
    </div>
  );
}

const CommunityIcon = ({ icon, link, label }: any) => {
  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false);
  const iconRef = useRef(null);

  return (
    <>
      <a
        href={link}
        className={styles.link}
        ref={iconRef}
        onMouseMove={() => setVisibleTooltip(true)}
        onMouseLeave={() => setVisibleTooltip(false)}
      >
        <Icon icon={icon} size="36px" color="var(--teal-600)" />
      </a>
      {visibleTooltip && (
        <Tooltip target={iconRef} position="top">
          {label}
        </Tooltip>
      )}
    </>
  )
}

function HomepageCommunitySection() {
  return (
    <div className={styles.communityLinksSection}>
      <div>
        <div className={styles.sectionHero}>
          <Heading as="h2" className={styles.h2}>
            Join our Community
          </Heading>
          <p>
            We have multiple channels where you can get help from members of our community as well
            as the Prisma team.
          </p>
        </div>
        <div className={styles.communityLinksRow}>
          {CommunityLinksData.map((communityInfo) => (
            <CommunityIcon
              icon={communityInfo.icon}
              link={communityInfo.link}
              label={communityInfo.linkText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const TabBox = ({ icon, label, description, list, link }: any) => {
  const location = useLocation();
  return (
    <div>
      <div className={styles.tabBox}>
        <div className={styles.content}>
          <div className={styles.heading}>
            {icon && <Icon className={styles.leftIcon} btn="left" icon={icon} size='inherit' color='var(--teal-600)' />}
            <span>{label}</span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
          <div className={styles.techGrid}>
            {list && list.length && list.map((l: any, idx: number) =>
              <SquareLogo
                className={styles.heroTabs}
                url={`${l.url}${location.search}`}
                image={l.image}
                tech={l.tech}
                {...l.imageDark && { imageDark: l.imageDark }}
              />
            )}
          </div>
        </div>
      </div>
      <Link to={`${link.url}${location.search}`}>
        <Icon icon={link.icon} size="inherit" color="inherit" btn="left" />
        <span>{link.label}</span>
        <Icon icon={"fa-regular fa-arrow-right"} size="inherit" color="inherit" btn="right" />
      </Link>
    </div>
  )
}

function HomepageHeroSection() {
  const { colorMode } = useColorMode();
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.hero}>
        <h1>Prisma Doc<span className={styles.h1Content} /></h1>
        <p>Working with Prisma gives you a best-in-class TypeScript ORM, a declarative database migration system, and a database with everything you need to get started.</p>
        <p className={styles.subline}>Try out what Prisma has to offer with one command:</p>
        <div className={styles[`hero-code-wrapper`]} data-theme={colorMode}>
          <CodeBlock className={clsx("language-terminal", styles["hero-code"])}>
            npx prisma init --db
          </CodeBlock>
          <Button variant="link" color="teal" leftIcon="fa-regular fa-robot" label={"Get Started with Prisma & AI"} link="/ai" style={{ fontSize: `18px` }} />
        </div>
        {/* <Badge
          link="/"
          className={styles.heroBadge}
          leftIcon="fa-solid fa-stars"
          variant="secondary"
          label="Start with an AI prompt →" color="teal"
        /> */}
        <div className={styles.tabBoxes}>
          {tabs && tabs.map((tab: any, idx: number) =>
            <TabBox {...tab} key={idx} />
          )}
        </div>
      </div>
    </div>
  )
}
function HomepageGetHelpSection() {
  const location = useLocation();
  return (
    <div className={styles.getHelpSection}>
      <Heading as="h3" className={styles.h3}>
        Get Help
      </Heading>
      <div className={styles.getHelpGrid}>
        {get_help.map((e: any) => (
          <div className={styles.helpItem}>
            <div className={styles.heading}>
              <div className={styles.icon}>
                <Icon icon={e.icon} size="24px" color="var(--surface-secondary" />
              </div>
              <h4>{e.title}</h4>
            </div>
            <div className={styles.content}>
              <p dangerouslySetInnerHTML={{ __html: e.description }} />
              <div className={styles.links}>
                {e.links.map((link: any) =>
                  <a href={`${link.link}${location.search}`} className={styles.link}>
                    <Icon icon={link.icon} size="inherit" btn="left" color="inherit" />
                    <span>{link.label}</span>
                    <Icon icon={"fa-regular fa-arrow-up-right"} size="inherit" btn="right" color="inherit" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  return (
    <Layout description="Get started with Prisma in the official documentation, and learn more about all Prisma's features with reference documentation, guides, and more.">
      <Head>
        <link rel="canonical" href="https://www.prisma.io/docs" />
      </Head>
      <main className={styles.mainHome}>
        <HomepageHeroSection />
        <HomepageHowDoISection />
        <HomepageProductCards />
        <HomepageGetHelpSection />
        <HomepageCommunitySection />
      </main>
    </Layout>
  );
}
