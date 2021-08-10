export const defaultOSIndex = (tabs: any[]): number => {
  let detectedOS = 'unkown'

  // Check user OS
  if (navigator.appVersion.indexOf('Mac') != -1 || navigator.appVersion.indexOf('Linux') != -1)
    detectedOS = 'unix'
  if (navigator.appVersion.indexOf('Win') != -1) detectedOS = 'windows'

  const matchedOS = (tab: any) => tab.props.defaultKey === detectedOS
  const index = tabs.findIndex(matchedOS)

  return index !== -1 ? index : 0
}
