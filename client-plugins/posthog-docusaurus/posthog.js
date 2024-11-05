import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate() {
      window.posthog.capture('$pageview');
    },
    onRouteDidUpdate({location, previousLocation}) {
      if (previousLocation && location.pathname !== previousLocation.pathname) {
        emitAnalyticsEvent('pageview', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: location.pathname,
        });
      }
    },
  };
})();


