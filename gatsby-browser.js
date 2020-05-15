const { init, trackPage } = require('./src/utils/stats')

exports.onClientEntry = () => {
  init()
}

exports.onRouteUpdate = ({ location }) => {
  trackPage(location.pathname)
}
