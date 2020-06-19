const React = require('react')
const { init, trackPage } = require('./src/utils/stats')
const { goToNav } = require('./src/utils/goToNavItem')
const Layout = require('./src/components/layout').default

exports.onClientEntry = () => {
  init()
}

exports.onRouteUpdate = ({ location }) => {
  trackPage(location.pathname)
  goToNav(location.pathname)
}

exports.wrapPageElement = ({ element, props }) => {
  if (element.props.pageResources.page.path !== '/404.html') {
    return <Layout {...props}>{element}</Layout>
  } else {
    return element
  }
}
