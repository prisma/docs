import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <TopSection>
          <ProductCardsWrapper>
            {Object.keys(ORMPlatformLinkData).map((e: string) => (
              <ProductCard color={e === 'porm' ? 'indigo' : 'teal'}>
                <H3>
                  <IconWrapper>
                    <Icon
                      icon={`fa-solid fa-${ORMPlatformLinkData[e].icon}`}
                      size="22px"
                      color="white"
                    />
                  </IconWrapper>
                  {ORMPlatformLinkData[e].title}
                </H3>
                <Body>{ORMPlatformLinkData[e].description}</Body>
                <LinkGrid>
                  {ORMPlatformLinkData[e].links.map((e: any) => (
                    <Link to={e.url}>
                      {e.title} {e.external ? <>&#8599;</> : <>&#8594;</>}
                    </Link>
                  ))}
                </LinkGrid>
              </ProductCard>
            ))}
          </ProductCardsWrapper>
        </TopSection>
        <PrismaORMSection>
          <H4>Prisma ORM</H4>
          <ORMLinkContainer>
            {GeneralLinkData.map((generalLink: any, index: number) => (
              <ORMLinkWrapper key={index} to={generalLink.url}>
                <IconWrapper>
                  <Icon icon={generalLink.icon} color="inherit" size="22px" className="light" />
                </IconWrapper>
                <div>
                  <h5>
                    {generalLink.title} <span>&#8594;</span>
                  </h5>
                  <p>{generalLink.description}</p>
                </div>
              </ORMLinkWrapper>
            ))}
          </ORMLinkContainer>
        </PrismaORMSection>
        <ORMCardsSection>
          <ORMCardsWrapper>
            <ORMProductCard color="indigo" style={{ padding: '40px' }}>
              <H4>Components</H4>
              <p>
                Open source Node.js and TypeScript ORM with an intuitive data model, automated
                migrations, type-safety, and auto-completion.
              </p>
              <div>
                <LinkGrid>
                  {CardLinks.components.map((card: any) => (
                    <Link to={card.url}>{card.title} &#8594;</Link>
                  ))}
                </LinkGrid>
              </div>
            </ORMProductCard>

            <ORMProductCard color="indigo" style={{ padding: '40px' }}>
              <H4>Reference</H4>
              <p>
                Open source Node.js and TypeScript ORM with an intuitive data model, automated
                migrations, type-safety, and auto-completion.
              </p>
              <div>
                <LinkGrid>
                  {CardLinks.reference.map((card: any) => (
                    <Link to={card.url}>{card.title} &#8594;</Link>
                  ))}
                </LinkGrid>
              </div>
            </ORMProductCard>
          </ORMCardsWrapper>
        </ORMCardsSection>
        <DatabasesSection>
          <H4>Databases</H4>
          <Body>
            Prisma ORM works seamlessly across most popular databases and service providers. <br /> Refer
            to our Database features matrix for information about supported features and types for
            each database.
          </Body>
          <DatabaseGrid>
            {DatabaseData.map((e: any) => (
              <Link to={e.url}>
                <div className="entry light">
                  {e.icon}
                  <span>{e.title}</span>
                </div>
              </Link>
            ))}
          </DatabaseGrid>
        </DatabasesSection>
        <CommunitySection>
          <div>
            <div className="section-hero">
              <H3>Join our Community</H3>
              <p>
                We have multiple channels where you can get help from members of our community as well
                as the Prisma team.
              </p>
            </div>
            <CommunityLinksRow>
              {CommunityLinksData.map((comm: any) => (
                <ShadowCard key={comm.id}>
                  <a
                    className="community-link-wrapper content"
                    href={comm.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon icon={comm.icon} color={theme.colors.indigo[600]} size="22px" />
                    <div>
                      <div>
                        <h4>{comm.title}</h4>
                        <Body>{comm.description}</Body>
                      </div>
                      <div className="link">
                        <span>{comm.linkText}</span>
                        <span> &#8599;</span>
                      </div>
                    </div>
                  </a>
                </ShadowCard>
              ))}
            </CommunityLinksRow>
          </div>
        </CommunitySection>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}

