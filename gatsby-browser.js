const { init, trackPage } = require('./src/utils/stats')
const { goToNav } = require('./src/utils/goToNavItem')
const { redirects } = require('./config')

exports.onClientEntry = () => {
  init()
}

exports.onRouteUpdate = ({ location }) => {
  trackPage(location.pathname)
  goToNav(location.pathname) // This may not work anymore due to the new scroll behavior of the sidebar
  // const isRedirectablePath = redirects.filter((redirect) => redirect.from === location.href)

  // if (isRedirectablePath[0]) {
  //   window.location.replace(isRedirectablePath[0].to)
  // }
}
