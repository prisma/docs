import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Icon } from "@site/src/components/Icon";
import { CommunityLinksData, get_help, how_do_i, ProductLinkData, tabs } from "@site/src/data/indexData";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import {useColorMode} from '@docusaurus/theme-common';

import Badge from "../components/button/Badge";
import CodeBlock from "../theme/CodeBlock";
import styles from "./index.module.scss";
import { SquareLogo } from "../components/GettingStarted";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../components/tooltip/Tooltip";

function HomepageCard({
  className,
  heading,
  body,
  link,
  links,
}: {
  className: string;
  heading: JSX.Element;
  body: JSX.Element;
  links?: JSX.Element;
  link?: string;
}): JSX.Element {
  return (
    link
      ? <Link className={className} to={link}>
        {heading}
        {body}
      </Link>
      : <div className={className}>
        {heading}
        {body}
        <div className={styles.linkGrid}>{links}</div>
      </div>

  );
}

function HomepageProductCards() {
  return (
    <div className={styles.homepageTopSection}>
      <div className={styles.productCardsWrapper}>
        <Heading as="h3" className={styles.h3}>Products</Heading>
        <div className={styles.productCards}>
          {Object.keys(ProductLinkData).map((e: keyof typeof ProductLinkData) => {
            const cardHeader = (
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <Icon icon={ProductLinkData[e].icon} color="#fff" size="32px" />
                </div>
                <div className={styles.cardHeaderContent}>
                  <h5 className={styles.eyebrow}>{ProductLinkData[e].eyebrow}</h5>
                  <Heading as="h4" className={styles.h4}>
                    <div
                      className={styles.h4}
                      dangerouslySetInnerHTML={{ __html: ProductLinkData[e].title }}
                    ></div>
                  </Heading>
                </div>
              </div>
            );
            const cardBody = (
              <div
                className={styles.body}
                dangerouslySetInnerHTML={{ __html: ProductLinkData[e].description }}
              ></div>
            );
            return (
              <HomepageCard
                className={e.startsWith("i_") ? styles.productCardIndigo : styles.productCardTeal}
                heading={cardHeader}
                body={cardBody}
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
  return (
    <div className={styles.howDoISection} ref={howRef}>
      <Heading as="h3" className={styles.h3}>
        How do I...
      </Heading>
      <div className={styles.howGrid}>
        {(seeMore ? how_do_i : how_do_i.slice(0, 3)).map((e: any) => (
          <div className={styles.howItem}>
            <Link to={e.url}>
              <h4>{e.title}</h4>
              <p>{e.description}</p>
            </Link>
            {(e.tags.length || e.time) && <div className={styles.footer}>
              {e.tags.length && <div className={styles.tags}>
                {e.tags.map((tag: any) => <Badge variant="primary" key={tag} color="gray" size="sm" label={tag} />)}
              </div>}
              {e.time && <div className={styles.readTime}>
                <Icon size="24px" color="var(--gray-500)" icon="fa-regular fa-clock" btn="left"/>
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
          howRef.current.scrollIntoView({behavior: "smooth", offset: 80});
        }}
      >
        <span>See {seeMore ? `less` : `more`}</span>
        <Icon icon={`fa-regular fa-arrow-${seeMore ? `up` : `down`}`} size="inherit" color="inherit" btn="right" />
      </div>
    </div>
  );
}

const CommunityIcon = ({icon, link, label}: any) => {
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

const TabBox = ({icon, label, description, list, link}: any) => {
  return (
    <div>
      <div className={styles.tabBox}>
        <div className={styles.heading}>
          {icon && <Icon className={styles.leftIcon} btn="left" icon={icon} size='inherit' color='var(--teal-600)' /> }
          <span>{label}</span>
        </div>
        <div className={styles.content}>
          <p dangerouslySetInnerHTML={{__html: description}}></p>
          <div className={styles.techGrid}>
            {list && list.length && list.map((l: any, idx: number) => 
              <SquareLogo
                className={styles.heroTabs}
                url={l.url}
                image={l.image}
                tech={l.tech}
                {... l.imageDark && { imageDark: l.imageDark }}
              />
            )}
          </div>
        </div>
      </div>
      <a href={link.url}>
        <Icon icon={link.icon} size="inherit" color="inherit" btn="left"/>
        <span>{link.label}</span>
        <Icon icon={"fa-regular fa-arrow-right"} size="inherit" color="inherit" btn="right"/>
        </a>
    </div>
  )
}

function HomepageHeroSection() {
  const { colorMode }  = useColorMode();

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.hero}>
        <h1>Getting Started</h1>
        <p>Working with Prisma gives you a best-in-class TypeScript ORM, a declarative database migration system, and a database with everything you need to get started.
          <br/> Try out everything Prisma has to offer with one command:</p>
        <div className={styles[`hero-code-wrapper`]} data-theme={colorMode}>
          <CodeBlock className={clsx("language-terminal", styles["hero-code"])}>
            npx prisma init --db
          </CodeBlock>
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
              <p dangerouslySetInnerHTML={{__html: e.description}}/>
              <div className={styles.links}>
                {e.links.map((link: any) => 
                  <a href={link.link} className={styles.link}>
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
