const { init, trackPage } = require('./src/utils/stats')
const { goToNav } = require('./src/utils/goToNavItem')
const { redirects } = require('./config')

exports.onClientEntry = () => {
  init()
}

exports.onRouteUpdate = ({ location }) => {
  trackPage(location.pathname)
  goToNav(location.pathname) // This may not work anymore due to the new scroll behavior of the sidebar
  const isRedirectablePath = redirects.filter((redirect) => {
    const redirectFromSplit = redirect.from.split('#')
    if (redirectFromSplit.length > 1) {
      const isHashPath =
        location.href.includes(redirectFromSplit[0]) && location.hash === `#${redirectFromSplit[1]}`
      return isHashPath
    }
    return location.href.includes(redirect.from)
  })
  if (isRedirectablePath[0]) {
    const newpath = location.href.replace(isRedirectablePath[0].from, isRedirectablePath[0].to)
    window.location.replace(newpath)
  }
}
