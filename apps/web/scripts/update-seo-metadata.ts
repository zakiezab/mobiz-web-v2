#!/usr/bin/env tsx
/**
 * SEO Metadata Update Script
 *
 * Updates Sanity documents with SEO keywords and metadata based on
 * the keyword mapping from docs/marketing/AI-Enabled B2B.md
 *
 * Run with: pnpm run update:seo
 */

import { createClient } from '@sanity/client';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n627fp81',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// SEO Keyword Mappings (from marketing/AI-Enabled B2B.md)
const SEO_UPDATES = {
  homepage: {
    keywords: [
      'execution partner',
      'accountability gap',
      'enterprise technology execution',
      'azure implementation partner',
      'mobiz execution model',
    ],
  },
  services: {
    'cloud-transformation': {
      keywords: [
        'enterprise cloud transformation partner',
        'azure cloud migration',
        'cloud modernization execution',
        'zero downtime migration',
        'cloud native architecture',
      ],
    },
    'ai-data-platforms': {
      keywords: [
        'production AI platform partner',
        'enterprise ai execution',
        'azure ai implementation',
        'mlops platform',
        'data platform modernization',
      ],
    },
    'digital-product-engineering': {
      keywords: [
        'enterprise digital product engineering',
        'product engineering partner',
        'digital platform execution',
        'custom software development',
        'api development services',
      ],
    },
    'core-system-modernization': {
      keywords: [
        'legacy system modernization services',
        'erp modernization partner',
        'core system transformation',
        'sap migration services',
        'mainframe modernization',
      ],
    },
  },
  caseStudies: {
    // Industry + Execution Type specific keywords
    'financial-cloud': [
      'financial services cloud migration',
      'banking digital transformation',
      'fintech execution partner',
    ],
    'healthcare-ai': [
      'healthcare ai implementation',
      'medical ai platform',
      'hipaa compliant ai',
    ],
    'manufacturing-ai': [
      'smart factory implementation',
      'industrial iot platform',
      'manufacturing ai',
    ],
    'retail-digital': [
      'omnichannel platform development',
      'retail digital transformation',
      'ecommerce platform implementation',
    ],
    'energy-cloud': [
      'energy grid modernization',
      'renewable energy platform',
      'utility cloud transformation',
    ],
    'financial-core': [
      'core banking modernization',
      'banking system migration',
      'financial erp implementation',
    ],
    'manufacturing-core': [
      'erp migration services',
      'sap implementation',
      'manufacturing erp modernization',
    ],
  },
};

async function updateHomepageSEO() {
  console.log('📄 Updating Homepage SEO...');

  const homepage = await client.fetch(`*[_type == "homepage"][0]`);

  if (!homepage) {
    console.log('  ⚠ No homepage document found');
    return;
  }

  // Only update if keywords are not already set
  if (!homepage.seo?.keywords || homepage.seo.keywords.length === 0) {
    await client
      .patch(homepage._id)
      .set({
        'seo.keywords': SEO_UPDATES.homepage.keywords,
      })
      .commit();

    console.log('  ✓ Updated homepage keywords');
  } else {
    console.log('  ⚠ Homepage already has keywords, skipping');
  }
}

async function updateServicePagesSEO() {
  console.log('\n📄 Updating Service Pages SEO...');

  for (const [slug, seoData] of Object.entries(SEO_UPDATES.services)) {
    const service = await client.fetch(
      `*[_type == "servicePage" && slug.current == $slug][0]`,
      { slug }
    );

    if (!service) {
      console.log(`  ⚠ Service not found: ${slug}`);
      continue;
    }

    // Only update if keywords are not already set
    if (!service.metaKeywords || service.metaKeywords.length === 0) {
      await client
        .patch(service._id)
        .set({
          metaKeywords: seoData.keywords,
        })
        .commit();

      console.log(`  ✓ Updated ${slug} keywords`);
    } else {
      console.log(`  ⚠ ${slug} already has keywords, skipping`);
    }
  }
}

async function updateCaseStudiesSEO() {
  console.log('\n📄 Updating Case Studies SEO...');

  const caseStudies = await client.fetch(
    `*[_type == "caseStudy"]{_id, title, slug, industry, executionType, seo}`
  );

  for (const study of caseStudies) {
    // Skip if already has SEO keywords
    if (study.seo?.keywords && study.seo.keywords.length > 0) {
      console.log(`  ⚠ ${study.title} already has keywords, skipping`);
      continue;
    }

    // Generate keywords based on industry + execution type
    const industryKey = study.industry || 'general';
    const executionKey = study.executionType || 'general';
    const combinedKey = `${industryKey}-${executionKey}`;

    // Get specific keywords or use generic ones
    const specificKeywords =
      SEO_UPDATES.caseStudies[combinedKey as keyof typeof SEO_UPDATES.caseStudies] || [];

    const baseKeywords = [
      'execution partner case study',
      'enterprise transformation',
      'production deployment',
    ];

    // Add industry-specific keyword
    if (study.industry) {
      baseKeywords.push(`${study.industry} industry transformation`);
    }

    // Add execution type keyword
    if (study.executionType) {
      const executionLabels: Record<string, string> = {
        cloud: 'cloud transformation',
        'ai-data': 'ai and data platforms',
        'digital-product': 'digital product engineering',
        'core-systems': 'core system modernization',
      };
      baseKeywords.push(executionLabels[study.executionType] || study.executionType);
    }

    const allKeywords = [...specificKeywords, ...baseKeywords];

    // Update the case study
    await client
      .patch(study._id)
      .set({
        'seo.keywords': allKeywords,
      })
      .commit();

    console.log(`  ✓ Updated ${study.title}`);
  }
}

async function updateExecutionAndDeliveredValuePages() {
  console.log('\n📄 Updating Execution & Delivered Value Pages SEO...');

  // Update Execution Page
  const executionPage = await client.fetch(`*[_type == "executionPage"][0]`);
  if (executionPage) {
    if (!executionPage.metaKeywords || executionPage.metaKeywords.length === 0) {
      await client
        .patch(executionPage._id)
        .set({
          metaKeywords: [
            'enterprise execution partner',
            'full stack execution',
            'cloud transformation partner',
            'production ai execution',
            'digital product engineering',
            'legacy system modernization',
          ],
        })
        .commit();
      console.log('  ✓ Updated Execution Hub keywords');
    } else {
      console.log('  ⚠ Execution Hub already has keywords, skipping');
    }
  }

  // Update Delivered Value Page
  const deliveredValuePage = await client.fetch(`*[_type == "deliveredValuePage"][0]`);
  if (deliveredValuePage) {
    if (!deliveredValuePage.metaKeywords || deliveredValuePage.metaKeywords.length === 0) {
      await client
        .patch(deliveredValuePage._id)
        .set({
          metaKeywords: [
            'execution partner results',
            'case studies',
            'azure transformation success',
            'production ai outcomes',
            'enterprise digital execution',
            'proven execution partner',
          ],
        })
        .commit();
      console.log('  ✓ Updated Delivered Value keywords');
    } else {
      console.log('  ⚠ Delivered Value already has keywords, skipping');
    }
  }
}

async function updateArticlesSEO() {
  console.log('\n📄 Updating Articles SEO...');

  const articles = await client.fetch(
    `*[_type == "article"]{_id, title, slug, seo}`
  );

  console.log(`  Found ${articles.length} articles`);

  if (articles.length === 0) {
    console.log('  ℹ No articles found to update');
    return;
  }

  let updated = 0;
  for (const article of articles) {
    // Only add base keywords if none exist
    if (!article.seo?.keywords || article.seo.keywords.length === 0) {
      await client
        .patch(article._id)
        .set({
          'seo.keywords': [
            'thought leadership',
            'enterprise technology',
            'execution insights',
            'digital transformation',
          ],
        })
        .commit();
      updated++;
    }
  }

  if (updated > 0) {
    console.log(`  ✓ Updated ${updated} articles with base keywords`);
    console.log('  ℹ Individual articles should be customized in Sanity Studio');
  } else {
    console.log('  ⚠ All articles already have keywords');
  }
}

async function main() {
  console.log('🚀 Starting SEO Metadata Update...\n');

  try {
    // Check if token exists
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN not found in environment variables');
    }

    console.log('✓ Sanity client configured');
    console.log(`  Project ID: ${client.config().projectId}`);
    console.log(`  Dataset: ${client.config().dataset}\n`);

    await updateHomepageSEO();
    await updateServicePagesSEO();
    await updateCaseStudiesSEO();
    await updateExecutionAndDeliveredValuePages();
    await updateArticlesSEO();

    console.log('\n✅ SEO Metadata Update Complete!\n');
    console.log('📝 Next Steps:');
    console.log('  1. Review keywords in Sanity Studio');
    console.log('  2. Customize article keywords for each post');
    console.log('  3. Review meta titles and descriptions');
    console.log('  4. Ensure all images have alt text');
    console.log('  5. Test with Google Rich Results Test\n');

  } catch (error) {
    console.error('\n❌ Error updating SEO metadata:', error);
    process.exit(1);
  }
}

main();
