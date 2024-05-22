import { createClient } from '@sanity/client';

const Client = createClient({
  projectId: 'ghlwzb10',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
});

export default Client;