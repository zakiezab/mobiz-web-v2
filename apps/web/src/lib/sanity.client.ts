import {createClient} from 'next-sanity'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? 'n627fp81'
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// IMPORTANT: Disable CDN in development to get fresh data immediately
// In production, CDN is enabled for performance, but revalidation ensures updates
// Setting useCdn to false bypasses Sanity's CDN cache, ensuring fresh data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Disable CDN in development mode to see changes immediately
  // In production, enable CDN for better performance (revalidation handles updates)
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})
