import { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [],
    pagesJsonUrl: "./lost-pixel-pages.json",
    baseUrl: "http://172.17.0.1:3000",
  },
  lostPixelProjectId: "clb5ek3mm1772001qqg7yban38",
  apiKey: process.env.LOST_PIXEL_API_KEY,
  compareConcurrency: 10,
  shotConcurrency: 10,
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
        }

        /* reset menu item alignment */
        #sidebar-holder li a {
          vertical-align: baseline;
        }
        `,
    });
  },
};
