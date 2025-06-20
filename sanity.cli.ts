/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const studioHost =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/studio'
    : 'https://next-multilang-template.vercel.app/studio'

export default defineCliConfig({ api: { projectId, dataset }, studioHost })
