export const urlGenerator = (path: string) => {
  return path.replace(/\d{2,}-/g, '')
}
