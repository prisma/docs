const path = require("path");

module.exports = function (context, options) {
  if (!options.apiKey) {
    throw new Error(
      `You need to specify an 'apiKey' to use posthog-docusaurus`
    );
  }

  const {
    apiKey,
    appUrl = "https://us.i.posthog.com",
    enableInDevelopment = false,
    ...rest
  } = options;

  if (!apiKey) {
    throw new Error(
      "You specified the `posthog` object in `themeConfig` but the `apiKey` field was missing. " +
        "Please ensure this is not a mistake."
    );
  }

  const posthogEnabled =
    process.env.NODE_ENV === "production" || enableInDevelopment;

  return {
    name: "posthog-docusaurus",

    getClientModules() {
      return posthogEnabled ? [path.resolve(__dirname, "./posthog")] : [];
    },

    injectHtmlTags() {
      if (!posthogEnabled) {
        return {};
      }

      const posthogInitOptions = { api_host: appUrl, ...rest };

      return {
        headTags: [
          {
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: appUrl,
            },
          },
          {
            tagName: "script",
            innerHTML: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init(${JSON.stringify(apiKey)}, ${JSON.stringify(
              posthogInitOptions
            )})
            `,
          },
        ],
      };
    },
  };
};
