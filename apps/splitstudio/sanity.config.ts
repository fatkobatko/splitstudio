import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset   = process.env.SANITY_STUDIO_DATASET!  // e.g. 'production'

// Toggle Vision via env so you can enable in dev, disable in prod
const enableVision = process.env.SANITY_STUDIO_ENABLE_VISION === 'true'

// If you host Studio at a subpath, set basePath: '/studio'.
// For a subdomain like studio.example.com, keep '/' (default).
export default defineConfig({
  name: process.env.SANITY_STUDIO_NAME || 'default',
  title: process.env.SANITY_STUDIO_TITLE || 'split_studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  plugins: [structureTool(), ...(process.env.SANITY_STUDIO_ENABLE_VISION === 'true' ? [visionTool()] : [])],
  schema: { types: schemaTypes },
})
