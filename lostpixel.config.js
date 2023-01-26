module.exports = {
  pageShots: {
    // write your pages here
    pages: [
      {
        path: '/reference/api-reference/prisma-schema-reference',
        name: '-reference-api-reference-prisma-schema-reference',
      },
      {
        path: '/reference/api-reference/prisma-client-reference',
        name: '-reference-api-reference-prisma-client-reference',
      },
    ],
    // you create your pages here & both are composed
    // pagesJsonUrl: 'http://localhost:9000/lost-pixel.json',
    // baseUrl: 'http://localhost:9000',
    // pagesJsonUrl: 'http://172.17.0.1:9000/lost-pixel.json',
    baseUrl: 'http://172.17.0.1:9000',
  },
  lostPixelProjectId: 'clb5felu61843101qqg5entz4x',

  ciBuildId: process.env.GITHUB_RUN_ID,
  ciBuildNumber: process.env.GITHUB_RUN_NUMBER,
  repository: process.env.REPOSITORY,
  commitRef: process.env.GITHUB_REF,
  commitRefName: process.env.GITHUB_REF_NAME,
  commitHash: process.env.COMMIT_HASH,
  compareEngine: 'odiff',
  //   s3: {
  //     endPoint: 'ams3.digitaloceanspaces.com',
  //     bucketName: 'beta-seven-turtle-time-blue-narrow',
  //     accessKey: process.env.S3_ACCESS_KEY,
  //     secretKey: process.env.S3_SECRET_KEY,
  //   },
  compareConcurrency: 10,
  shotConcurrency: 1,
  beforeScreenshot: async (page) => {
    await page.addStyleTag({
      content: `iframe {
        visibility: hidden;
      }
  
      /* do not show underline animation */
      #toc-holder  a {
        background-size: 0 !important;
        background-image: none !important;
      }
      /* skip image display within section */
      section img {
        visibility: hidden;
      }
  
      /* hide cookie banner */
      #onetrust-consent-sdk {
        display: none;
      }`,
    })
  },
}
