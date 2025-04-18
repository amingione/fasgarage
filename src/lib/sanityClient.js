import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: true, // read-only, safe for frontend
  // ✅ DO NOT include token in this client
});

export default sanity;