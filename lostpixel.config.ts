import type { CustomProjectConfig } from "lost-pixel";

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [],
    pagesJsonUrl: "./lost-pixel-pages.json",
    baseUrl: "http://172.17.0.1:3000",
    mask: [{ selector: ".sidebar-promo" }, { selector: "article img" }],
  },
  lostPixelProjectId: "clb5ek3mm1772001qqg7yban38",
  apiKey: process.env.LOST_PIXEL_API_KEY,
  compareConcurrency: 10,
  shotConcurrency: 10,
  threshold: 10,
};
