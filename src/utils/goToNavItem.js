module.exports = {
  goToNav(pathname) {
    var currentElem = document.getElementById(pathname.replace(/\/$/, ''))
    const sidebarElem = document.getElementById('sidebar-holder')
    if (currentElem && sidebarElem) {
      var topPos = currentElem.getBoundingClientRect().top - 250
      sidebarElem.scrollTo(0, topPos)
    }
  },
}
