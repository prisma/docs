import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Icon } from "@site/src/components/Icon";
import { CommunityLinksData, DatabaseData, GeneralLinks_Build, GeneralLinks_Fortify, GeneralLinks_Grow, ORMCardLinkData, ORMGeneralLinkData, ProductLinkData } from "@site/src/data/indexData";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";

import DarkImg from "../theme/DarkImg";
import styles from "./index.module.scss";

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
        <Icon className={styles.mobileArrow} icon="fa-regular fa-arrow-right" size="24px" color="var(--tertiary-font-color)" />
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
  );
}

function HomepageORMLinksSection() {
  return (
    <div className={styles.ormLinkSectionWrapper}>
      <Heading as="h2" className={styles.h2}>Resources</Heading>
      <div className={styles.ormLinkGrid}>
        <div className={styles.ormLinkCol}>
          {GeneralLinks_Build.map((link, index) => (
            <Link key={index} to={link.url} className={styles.ormLinkWrapper}>
              <div>
                <h5>
                  {link.title} <span>&#8594;</span>
                </h5>
                <p>{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.ormLinkCol}>
          {GeneralLinks_Fortify.map((link, index) => (
            <Link key={index} to={link.url} className={styles.ormLinkWrapper}>
              <div>
                <h5>
                  {link.title} <span>&#8594;</span>
                </h5>
                <p>{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.ormLinkCol}>
          {GeneralLinks_Grow.map((link, index) => (
            <Link key={index} to={link.url} className={styles.ormLinkWrapper}>
              <div>
                <h5>
                  {link.title} <span>&#8594;</span>
                </h5>
                <p>{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <HomepageORMCards />
    </div>
  );
}

function HomepageORMCards() {
  return (
    <div className={styles.ormCardsSection}>
      <div className={styles.ormCardsWrapper}>
        {Object.keys(ORMCardLinkData).map((e) => {
          const cardHeader = (
            <Heading as="h4" className={styles.h4}>
              {ORMCardLinkData[e].title}
            </Heading>
          );
          const cardBody = <div className={styles.body}>{ORMCardLinkData[e].description}</div>;
          const cardLinks = ORMCardLinkData[e].links.map((link) => (
            <Link to={link.url}>
              {link.title} {link.external ? <>&#8599;</> : <>&#8594;</>}
            </Link>
          ));
          return (
            <HomepageCard
              className={styles.productCardIndigo}
              heading={cardHeader}
              body={cardBody}
              links={cardLinks}
            />
          );
        })}
      </div>
    </div>
  );
}

function HomepageDatabasesSection() {
  return (
    <div className={styles.databasesSection}>
      <Heading as="h2" className={styles.h2}>
        Databases
      </Heading>
      <div className={styles.body}>
        Prisma ORM works seamlessly across most popular databases and service providers. Refer to
        our <Link to="/orm/reference/database-features">Database features matrix</Link> for
        information about supported features and types for each database.
        <br />
        To explore supported databases for Accelerate, visit the{" "}
        <Link to="/accelerate/getting-started#prerequisites">prerequisites section</Link>.
      </div>
      <div className={styles.databaseGrid}>
        {DatabaseData.map((e) => (
          <Link to={e.url} className={styles.linkCardWrapper}>
            <div className={styles.databaseEntry}>
              <DarkImg
                icon={useBaseUrl(e.icon)}
                darkIcon={useBaseUrl(e.darkIcon)}
                style={{
                  height: `100%`,
                  width: e.icon.endsWith("sqlite.svg") ? `55px` : `auto`,
                  marginRight: e.icon.endsWith("sqlite.svg") ? `-30px` : 0,
                }}
              />
              <span>{e.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
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
            <div key={communityInfo.id} className={styles.communityLinkCard}>
              <Link
                to={communityInfo.link}
                rel="noreferrer"
                target="_blank"
                className={clsx(styles.communityLinkWrapper, styles.content)}
              >
                <Icon icon={communityInfo.icon} color="VAR HERE" size="22px" />
                <div>
                  <div>
                    <h4>{communityInfo.title}</h4>
                    <div className={styles.body}>{communityInfo.description}</div>
                  </div>
                  <div className={styles.link}>
                    <span>{communityInfo.linkText}</span>
                    <span> &#8599;</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
        <HomepageProductCards />
        <HomepageORMLinksSection />

        <HomepageDatabasesSection />
        <HomepageCommunitySection />
      </main>
    </Layout>
  );
}
