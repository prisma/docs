module.exports = (options) => ({
  appId: null,
  adminKey: null,
  searchKey: null,
  indexName: null,
  query: '', // optional: use this to overwrite the default query.
  ...options,
})
