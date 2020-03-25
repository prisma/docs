export function slug(title: string) {
  return title
    .replace(/\s/g, '-')
    .replace('.md', '')
    .replace('@', '')
    .replace('/', '-')
    .replace('.', '')
    .replace(/\?/g, '')
    .replace(/\&/g, 'and')
    .replace(/"|'|`/g, '')
    .replace(/!/g, '')
    .replace(/[\(\)]/g, '')
    .toLowerCase();
}
