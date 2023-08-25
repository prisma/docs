module.exports = {
  pageShots: {
    pagesJsonUrl: 'http://172.17.0.1:9000/lost-pixel.json',
    baseUrl: 'http://172.17.0.1:9000',
    mask: [{ selector: 'span.gatsby-resp-image-background-image' }],
  },
  lostPixelProjectId: 'cllqhxvmz0jzjjj0eabfs6jxg',
  apiKey: process.env.LOST_PIXEL_API_KEY,
  compareConcurrency: 10,
  shotConcurrency: 2,
  threshold: 10,
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
