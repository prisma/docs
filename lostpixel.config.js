module.exports = {
  pageShots: {
    // write your pages here, it's an empty array, as we are generating the pages on the fly in gatsby-plugin
    // pages: [
    //   { path: '/getting-started', name: '-getting-started' },
    //   { path: '/concepts', name: '-concepts' },
    // ],
    // you create your pages on the fly here & it is composed with `pages` array
    pagesJsonUrl: 'http://172.17.0.1:9000/lost-pixel.json',
    baseUrl: 'http://172.17.0.1:9000',
  },
  //generateOnly: true,
  lostPixelProjectId: 'clb5ek3mm1772001qqg7yban38',
  apiKey: process.env.LOST_PIXEL_API_KEY,
  compareConcurrency: 10,
  shotConcurrency: 10,
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
