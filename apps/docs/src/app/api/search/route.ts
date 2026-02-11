import { createMixedbreadSearchAPI } from 'fumadocs-core/search/mixedbread';
import Mixedbread from '@mixedbread/sdk';

const client = new Mixedbread({
  apiKey: process.env.MIXEDBREAD_API_KEY!,
});

export const { GET } = createMixedbreadSearchAPI({
  client,
  storeIdentifier: 'web-search',
});
