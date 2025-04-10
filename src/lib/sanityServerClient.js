// src/lib/sanityServerClient.js
import { createClient } from '@sanity/client';

const sanityServer = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

export default sanityServer;