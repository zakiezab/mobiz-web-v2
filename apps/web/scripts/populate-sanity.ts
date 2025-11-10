#!/usr/bin/env tsx
/**
 * Sanity Content Population Script
 *
 * This script populates your Sanity CMS with:
 * - 5 Service Pages with categories (Cloud Services, Data & AI, Digital Engineering, Modernization)
 * - 8 Case Studies with proper industry/execution tags
 * - 4 Engagement Models
 *
 * Run with: npx tsx scripts/populate-sanity.ts
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

// Service Pages Data
const servicePages = [
  {
    _type: 'servicePage',
    title: 'Cloud Transformation',
    slug: { _type: 'slug', current: 'cloud-transformation' },
    category: 'cloud-services',
    kicker: 'Execution /',
    heroHeadline: 'Beyond "Lift & Shift." Cloud-Native Certainty.',
    heroSubheadline: 'Complete cloud transformations with zero disruption, fixed timelines, and guaranteed outcomes. We design, build, and deploy cloud-native architectures that deliver real business value.',
    problemHeadline: 'The Cloud "Stall"',
    problemDescription: 'Most cloud migrations fail because of the accountability gap. Strategy firms deliver PowerPoints, then leave. System integrators deliver billable hours, not outcomes. Applications, data, and infrastructure are transformed separately, creating integration nightmares.',
    solutionDescription: 'Our model eliminates handoffs. The team that designs your cloud architecture is the same team that builds and deploys your production system. We own the entire transformation from strategy to scaled operations.',
    capabilities: [
      {
        _type: 'capability',
        _key: 'app-mod',
        title: 'Application Modernization',
        description: 'Legacy applications replatformed and refactored for cloud-native performance. Microservices, containers, and serverless architectures deployed at scale.',
      },
      {
        _type: 'capability',
        _key: 'multi-cloud',
        title: 'Multi-Cloud Architecture',
        description: 'Technology-agnostic cloud strategies across Azure, AWS, and GCP. First-principles architecture designed for your reality, not vendor lock-in.',
      },
      {
        _type: 'capability',
        _key: 'zero-downtime',
        title: 'Zero-Downtime Migration',
        description: 'Production workloads migrated with zero business disruption. Proven methodologies for data migration, cutover planning, and rollback strategies.',
      },
      {
        _type: 'capability',
        _key: 'cloud-native',
        title: 'Cloud-Native Engineering',
        description: 'Infrastructure as code, automated CI/CD pipelines, and DevOps practices embedded from day one. Built for scale, reliability, and continuous deployment.',
      },
    ],
    proofKicker: 'PROVEN AT SCALE',
    proofMetric: '$47M',
    proofContext: 'in cost savings delivered',
    proofBody: '2,000+ applications migrated to cloud with zero downtime for a Global Financial Services leader. Complete transformation from strategy to production in 18 months.',
    ctaHeadline: 'Ready to Execute Your Cloud Strategy?',
    ctaBody: 'Stop talking about cloud transformation. Start executing it. We design, build, and deploy cloud-native systems that deliver measurable business value.',
    metaTitle: 'Cloud Transformation Services - Enterprise Cloud Migration Partner | Mobiz',
    metaDescription: 'Complete cloud transformations with zero disruption. Azure, AWS, and multi-cloud migrations executed by the team that designs your architecture. Guaranteed outcomes.',
  },
  {
    _type: 'servicePage',
    title: 'AI & Data Platforms',
    slug: { _type: 'slug', current: 'ai-data-platforms' },
    category: 'data-ai',
    kicker: 'Execution /',
    heroHeadline: 'Production AI. Real Business Value.',
    heroSubheadline: 'From data architecture to production-grade AI models that turn your data into competitive advantage. We build AI platforms that scale, not science projects.',
    problemHeadline: 'The AI "Pilot Purgatory"',
    problemDescription: 'Most AI initiatives die in pilot purgatory. Data scientists build models that never reach production. Data engineering teams build pipelines that never connect to business value. The gap between experimentation and execution kills ROI.',
    solutionDescription: 'We build production AI platforms from the ground up. Data architecture, model development, MLOps pipelines, and scaled deployment—all delivered by one accountable team. Your AI goes from concept to production in 3-6 months.',
    capabilities: [
      {
        _type: 'capability',
        _key: 'data-arch',
        title: 'Data Platform Architecture',
        description: 'Modern data platforms built on Azure, AWS, or Databricks. Data lakes, warehouses, and streaming architectures designed for AI workloads at scale.',
      },
      {
        _type: 'capability',
        _key: 'ml-ops',
        title: 'Production MLOps',
        description: 'End-to-end ML pipelines from training to deployment. Model monitoring, versioning, and continuous retraining automated for enterprise reliability.',
      },
      {
        _type: 'capability',
        _key: 'ai-apps',
        title: 'AI Application Development',
        description: 'Custom AI applications integrated into your business processes. NLP, computer vision, predictive analytics, and generative AI deployed in production.',
      },
      {
        _type: 'capability',
        _key: 'gen-ai',
        title: 'Generative AI & LLMs',
        description: 'Enterprise LLM implementations with RAG, fine-tuning, and custom models. Azure OpenAI, GPT-4, and open-source models deployed securely.',
      },
    ],
    proofKicker: 'FEATURED BY MICROSOFT',
    proofMetric: '6 months',
    proofContext: 'from concept to production AI',
    proofBody: 'AI platform for pharmaceutical R&D at Sanofi, featured by Microsoft for its business impact. Production-grade AI delivering real research acceleration.',
    ctaHeadline: 'Ready to Deploy Production AI?',
    ctaBody: 'Stop running AI pilots. Start deploying AI platforms that scale. We build production systems that deliver measurable business outcomes.',
    metaTitle: 'AI & Data Platform Services - Production AI Implementation Partner | Mobiz',
    metaDescription: 'Production-grade AI platforms from data architecture to scaled deployment. MLOps, generative AI, and enterprise data platforms that deliver real business value.',
  },
  {
    _type: 'servicePage',
    title: 'Digital Product Engineering',
    slug: { _type: 'slug', current: 'digital-product-engineering' },
    category: 'digital-engineering',
    kicker: 'Execution /',
    heroHeadline: 'Mission-Critical Experiences, Engineered.',
    heroSubheadline: 'Customer-facing platforms, APIs, and digital products engineered for enterprise performance. We build the experiences that define your brand and drive your business.',
    problemHeadline: 'The Speed vs. Quality Trap',
    problemDescription: 'Digital products fail when speed sacrifices quality or quality sacrifices speed. Agencies deliver designs that can\'t be built. Dev shops deliver code that can\'t be scaled. The disconnect between design, engineering, and operations creates products that disappoint.',
    solutionDescription: 'Our model integrates product strategy, UX design, and full-stack engineering into one accountable team. We build digital products from concept to scaled production—fast, high-quality, and built to last.',
    capabilities: [
      {
        _type: 'capability',
        _key: 'product-strategy',
        title: 'Product Strategy & Design',
        description: 'Product strategy, UX/UI design, and technical architecture aligned from day one. Design systems built for scale and maintainability.',
      },
      {
        _type: 'capability',
        _key: 'web-mobile',
        title: 'Web & Mobile Applications',
        description: 'React, Next.js, React Native applications engineered for performance. Progressive web apps and native mobile experiences built on modern stacks.',
      },
      {
        _type: 'capability',
        _key: 'api-platforms',
        title: 'API Platforms & Integration',
        description: 'Enterprise API platforms, microservices architectures, and system integrations. GraphQL, REST, and event-driven architectures at scale.',
      },
      {
        _type: 'capability',
        _key: 'performance',
        title: 'Performance Engineering',
        description: 'Sub-second page loads, 99.9% uptime, and enterprise-grade security. Performance optimization, load testing, and monitoring built in from launch.',
      },
    ],
    proofKicker: 'ENTERPRISE SCALE',
    proofMetric: '3.2M',
    proofContext: 'concurrent users supported',
    proofBody: 'Omnichannel platform for Fortune 500 retailer, replacing legacy systems with modern architecture. 45% faster time-to-market and 99.95% uptime in production.',
    ctaHeadline: 'Ready to Build Digital Products That Scale?',
    ctaBody: 'Stop compromising between speed and quality. We engineer digital products that perform at enterprise scale from day one.',
    metaTitle: 'Digital Product Engineering Services - Enterprise Web & Mobile Development | Mobiz',
    metaDescription: 'Mission-critical digital products engineered for enterprise performance. Web, mobile, and API platforms built to scale with 99.9% uptime guaranteed.',
  },
  {
    _type: 'servicePage',
    title: 'Core System Modernization',
    slug: { _type: 'slug', current: 'core-system-modernization' },
    category: 'modernization',
    kicker: 'Execution /',
    heroHeadline: 'Replace Legacy Risk. Deploy Modern Certainty.',
    heroSubheadline: 'Legacy system modernization and ERP migrations executed end-to-end. We manage the complexity and risk others avoid, delivering on-time, on-budget transformations.',
    problemHeadline: 'The Legacy "Trap"',
    problemDescription: 'Legacy systems create existential risk but are too complex to replace. ERP and core system migrations fail 70% of the time due to poor planning, underestimated complexity, and accountability gaps between consultants, integrators, and operators.',
    solutionDescription: 'We specialize in the transformations others fear. Our team owns the entire lifecycle—from current state assessment to production cutover. We manage the complexity, mitigate the risk, and deliver systems that work.',
    capabilities: [
      {
        _type: 'capability',
        _key: 'erp-migration',
        title: 'ERP Migration & Implementation',
        description: 'SAP, Oracle, Microsoft Dynamics migrations executed with precision. Data migration, process reengineering, and change management integrated into delivery.',
      },
      {
        _type: 'capability',
        _key: 'legacy-mod',
        title: 'Legacy System Modernization',
        description: 'Mainframe, COBOL, and monolithic systems modernized with phased, risk-managed approaches. Strangler fig patterns and microservices migrations executed safely.',
      },
      {
        _type: 'capability',
        _key: 'data-migration',
        title: 'Enterprise Data Migration',
        description: 'Complex data migrations with zero data loss. ETL pipelines, data validation, and rollback strategies proven across billions of records.',
      },
      {
        _type: 'capability',
        _key: 'integration',
        title: 'System Integration',
        description: 'Core systems integrated with CRM, supply chain, financial systems, and analytics platforms. APIs, messaging, and real-time data synchronization.',
      },
    ],
    proofKicker: 'ZERO FAILED MIGRATIONS',
    proofMetric: '100%',
    proofContext: 'on-time, on-budget delivery',
    proofBody: 'Core system modernizations for Fortune 500 enterprises across manufacturing, financial services, and healthcare. Perfect track record of on-time, on-budget delivery.',
    ctaHeadline: 'Ready to Modernize Your Core Systems?',
    ctaBody: 'Stop living with legacy risk. We execute the modernizations others fear, delivering on-time, on-budget transformations with zero surprises.',
    metaTitle: 'Core System Modernization Services - ERP Migration & Legacy System Transformation | Mobiz',
    metaDescription: 'Legacy system modernization and ERP migrations executed with zero risk. SAP, Oracle, and core system transformations delivered on-time, on-budget.',
  },
  {
    _type: 'servicePage',
    title: 'Azure Landing Zone',
    slug: { _type: 'slug', current: 'azure-landing-zone' },
    category: 'cloud-services',
    kicker: 'Cloud Services /',
    heroHeadline: 'Enterprise Azure Foundations, Executed.',
    heroSubheadline: 'Secure, scalable, and compliant Azure Landing Zones built to enterprise standards. We design, deploy, and operate your Azure foundation with 24/7 managed services.',
    problemHeadline: 'The Azure Foundation Challenge',
    problemDescription: 'Organizations rush to Azure without proper foundation, creating security gaps, compliance risks, and scalability issues. DIY landing zones miss critical enterprise requirements. Consultants deliver blueprints but not implementation. The gap between strategy and execution leaves infrastructure vulnerable.',
    solutionDescription: 'We build production-ready Azure Landing Zones using Microsoft Cloud Adoption Framework and Well-Architected principles. From identity and governance to networking and security, we deliver enterprise-grade foundations ready for workload deployment—then manage and optimize them 24/7.',
    capabilities: [
      {
        _type: 'capability',
        _key: 'governance',
        title: 'Governance & Compliance',
        description: 'Policy-driven governance, RBAC, management groups, and compliance frameworks. Azure Policy, Blueprints, and automation ensuring enterprise control and regulatory compliance.',
      },
      {
        _type: 'capability',
        _key: 'networking',
        title: 'Hub-Spoke Network Architecture',
        description: 'Enterprise-grade networking with Azure Virtual WAN, ExpressRoute, and secure connectivity. Network isolation, firewall rules, traffic management, and hybrid cloud integration.',
      },
      {
        _type: 'capability',
        _key: 'security',
        title: 'Zero Trust Security',
        description: 'Microsoft Defender, Azure Security Center, identity protection, and threat detection. Security baselines meeting CIS, NIST, and industry-specific compliance standards.',
      },
      {
        _type: 'capability',
        _key: 'automation',
        title: 'Infrastructure as Code',
        description: 'Terraform or Bicep-based landing zone automation. Repeatable deployments, version control, and CI/CD pipelines for infrastructure with full auditability.',
      },
      {
        _type: 'capability',
        _key: 'support',
        title: '24/7 Managed Services',
        description: 'Proactive monitoring, incident response, security assessments, and continuous optimization. Azure MSP services with dedicated support and SLA guarantees.',
      },
      {
        _type: 'capability',
        _key: 'cost',
        title: 'Cost Management & Optimization',
        description: 'Right-sizing resources, eliminating waste, and maximizing ROI. Continuous cost monitoring, budgeting, and optimization aligned with business objectives.',
      },
    ],
    proofKicker: 'PROVEN EXECUTION',
    proofMetric: '100%',
    proofContext: 'compliance & security standards met',
    proofBody: 'Enterprise Azure Landing Zones deployed for Fortune 500 organizations across regulated industries. Full compliance with SOC 2, HIPAA, PCI-DSS, and financial services requirements. Zero security incidents in production.',
    ctaHeadline: 'Ready to Build Your Azure Foundation?',
    ctaBody: 'Stop compromising on Azure architecture. We build enterprise landing zones that scale, secure, and comply from day one—then manage them with 24/7 expert support.',
    metaTitle: 'Azure Landing Zone Services - Enterprise Cloud Foundation & Managed Services | Mobiz',
    metaDescription: 'Production-ready Azure Landing Zones built to Microsoft Cloud Adoption Framework standards. Secure, compliant, and scalable Azure foundations with 24/7 managed services.',
    metaKeywords: ['azure landing zone', 'azure cloud adoption framework', 'enterprise azure architecture', 'azure governance', 'azure security baseline', 'azure managed services', 'azure msp'],
  },
];

// Case Studies Data
const caseStudies = [
  {
    _type: 'caseStudy',
    title: 'Global Financial Services Cloud Transformation',
    slug: { _type: 'slug', current: 'global-financial-services-cloud' },
    kicker: 'FINANCIAL SERVICES',
    cardHeadline: 'Zero-Downtime Migration of 2,000+ Applications',
    metricLarge: '$47M',
    metricContext: 'in cost savings delivered',
    industry: 'financial',
    executionType: 'cloud',
    challenge: 'A global financial services leader needed to migrate 2,000+ mission-critical applications from on-premises data centers to Azure cloud while maintaining zero downtime and meeting strict regulatory requirements. Previous attempts with traditional SI partners had stalled due to complexity and risk.',
    solution: 'We deployed a unified team owning architecture, migration execution, and production operations. Implemented automated migration pipelines, comprehensive testing frameworks, and phased cutover strategies. All applications modernized for cloud-native performance while maintaining business continuity.',
    results: '$47M in annual cost savings from infrastructure optimization. Zero downtime across all migrations. 40% improvement in application performance. Completed 18-month transformation on schedule and under budget.',
    technologiesUsed: ['Azure', 'Kubernetes', 'Terraform', 'Azure DevOps', 'App Service', 'SQL Database'],
    seo: {
      title: 'Financial Services Cloud Migration Case Study | Mobiz',
      description: '2,000+ applications migrated to Azure with zero downtime. $47M in savings delivered for global financial services leader.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Sanofi AI Platform for Pharmaceutical R&D',
    slug: { _type: 'slug', current: 'sanofi-ai-platform' },
    kicker: 'HEALTHCARE / AI',
    cardHeadline: 'Production AI Platform Featured by Microsoft',
    metricLarge: '6 months',
    metricContext: 'from concept to production AI',
    industry: 'healthcare',
    executionType: 'ai-data',
    challenge: 'Sanofi needed an AI platform to accelerate pharmaceutical research and drug discovery. The platform had to integrate with existing research systems, handle sensitive data securely, and deliver measurable research acceleration—not just AI experiments.',
    solution: 'Built end-to-end AI platform on Azure with custom ML models, data pipelines, and research interfaces. Integrated with existing lab systems and research workflows. Deployed MLOps infrastructure for continuous model improvement and monitoring.',
    results: 'Platform featured by Microsoft as exemplar AI implementation. 6 months from concept to scaled production. Measurable acceleration in research workflows. Secure, compliant platform handling sensitive pharmaceutical data.',
    technologiesUsed: ['Azure Machine Learning', 'Python', 'Databricks', 'Azure OpenAI', 'MLflow', 'React'],
    seo: {
      title: 'Pharmaceutical AI Platform Case Study - Sanofi | Mobiz',
      description: 'Production AI platform for pharmaceutical R&D, featured by Microsoft. 6 months from concept to scaled deployment.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Global Manufacturer Smart Factory Platform',
    slug: { _type: 'slug', current: 'manufacturing-smart-factory' },
    kicker: 'MANUFACTURING / IOT',
    cardHeadline: '140 Facilities Connected, 87% Efficiency Gain',
    metricLarge: '140',
    metricContext: 'facilities connected globally',
    industry: 'manufacturing',
    executionType: 'ai-data',
    challenge: 'Global manufacturer needed to digitize 140 production facilities worldwide with real-time monitoring, predictive maintenance, and AI-driven optimization. Legacy systems couldn\'t support IoT integration or real-time analytics at scale.',
    solution: 'Built cloud-native IoT platform with edge computing, real-time data streaming, and AI-powered analytics. Deployed standardized architecture across all facilities with local customization. Integrated with existing MES and ERP systems.',
    results: '140 facilities connected and operational. 87% gain in production efficiency through predictive maintenance and optimization. Real-time visibility across global operations. Platform scaled to handle millions of IoT events per second.',
    technologiesUsed: ['Azure IoT Hub', 'Event Hubs', 'Stream Analytics', 'Power BI', 'Python', 'Edge Computing'],
    seo: {
      title: 'Smart Factory IoT Platform Case Study | Mobiz',
      description: '140 manufacturing facilities digitized with AI-powered IoT platform. 87% efficiency improvement delivered.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Fortune 500 Retailer Omnichannel Platform',
    slug: { _type: 'slug', current: 'retail-omnichannel-platform' },
    kicker: 'RETAIL / DIGITAL',
    cardHeadline: '3.2M Concurrent Users, 45% Faster Time-to-Market',
    metricLarge: '3.2M',
    metricContext: 'concurrent users supported',
    industry: 'retail',
    executionType: 'digital-product',
    challenge: 'Fortune 500 retailer needed to replace fragmented e-commerce and in-store systems with unified omnichannel platform. Required support for millions of concurrent users during peak shopping periods while modernizing customer experience.',
    solution: 'Architected and built cloud-native platform with microservices, headless commerce, and modern frontend. Integrated inventory, CRM, payment, and fulfillment systems. Implemented progressive web app for mobile experiences.',
    results: '3.2M concurrent users supported during peak. 45% faster time-to-market for new features. 99.95% uptime achieved. Seamless experience across web, mobile, and in-store channels.',
    technologiesUsed: ['Next.js', 'React', 'Node.js', 'Azure Kubernetes', 'PostgreSQL', 'Redis', 'Stripe'],
    seo: {
      title: 'Omnichannel Retail Platform Case Study | Mobiz',
      description: 'Enterprise e-commerce platform supporting 3.2M concurrent users. 45% faster feature delivery for Fortune 500 retailer.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Energy Leader Grid Modernization',
    slug: { _type: 'slug', current: 'energy-grid-modernization' },
    kicker: 'ENERGY / INFRASTRUCTURE',
    cardHeadline: '100% Renewable Integration, Real-Time Monitoring',
    metricLarge: '100%',
    metricContext: 'renewable energy integrated',
    industry: 'energy',
    executionType: 'cloud',
    challenge: 'Energy company needed to modernize grid infrastructure to integrate renewable energy sources, enable real-time monitoring, and predict maintenance needs. Legacy SCADA systems couldn\'t support modern requirements.',
    solution: 'Built modern grid management platform with real-time data ingestion from 50+ facilities. Integrated renewable energy sources with traditional grid. Deployed predictive analytics for maintenance and demand forecasting.',
    results: '100% renewable energy integration achieved. Real-time monitoring across 50+ facilities. 30% reduction in unplanned outages through predictive maintenance. Carbon tracking and reporting automated.',
    technologiesUsed: ['Azure', 'IoT Hub', 'Time Series Insights', 'Power BI', 'Machine Learning', 'Python'],
    seo: {
      title: 'Energy Grid Modernization Case Study | Mobiz',
      description: 'Grid modernization with 100% renewable integration. Real-time monitoring and predictive maintenance across 50+ facilities.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Healthcare System AI Diagnostics Platform',
    slug: { _type: 'slug', current: 'healthcare-ai-diagnostics' },
    kicker: 'HEALTHCARE / AI',
    cardHeadline: '23 Hospitals, 94% Diagnostic Accuracy',
    metricLarge: '8 weeks',
    metricContext: 'to deploy across system',
    industry: 'healthcare',
    executionType: 'ai-data',
    challenge: 'Multi-hospital system needed AI-powered diagnostic platform to improve early detection and reduce diagnostic errors. Required HIPAA compliance, integration with existing EHR systems, and physician trust in AI recommendations.',
    solution: 'Developed AI diagnostic platform with explainable AI models, EHR integration, and physician workflow integration. Deployed across 23 hospitals with comprehensive training and change management. Ensured HIPAA compliance and data security.',
    results: '94% diagnostic accuracy in early detection. Deployed across 23 hospitals in 8 weeks. Physician adoption rate exceeded 85%. HIPAA-compliant platform handling millions of patient records securely.',
    technologiesUsed: ['Azure ML', 'Python', 'TensorFlow', 'HL7 FHIR', 'React', 'PostgreSQL', 'Azure Security'],
    seo: {
      title: 'Healthcare AI Diagnostics Case Study | Mobiz',
      description: 'AI diagnostic platform deployed across 23 hospitals. 94% accuracy in early detection with full HIPAA compliance.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Financial Institution Core Banking Modernization',
    slug: { _type: 'slug', current: 'banking-core-modernization' },
    kicker: 'FINANCIAL SERVICES',
    cardHeadline: 'Legacy Core Banking Replaced, Zero Downtime',
    metricLarge: '100%',
    metricContext: 'on-time, on-budget delivery',
    industry: 'financial',
    executionType: 'core-systems',
    challenge: 'Regional bank needed to replace 30-year-old core banking system with modern platform. Required zero downtime during cutover, zero data loss, and strict regulatory compliance. Previous modernization attempts had failed.',
    solution: 'Executed phased modernization with comprehensive data migration strategy, parallel run testing, and minute-by-minute cutover planning. Built modern APIs for digital banking while maintaining legacy system compatibility during transition.',
    results: 'Zero downtime during cutover weekend. 100% data accuracy validated. All regulatory requirements met. Modern platform enabling rapid feature development. Completed on-time and under budget.',
    technologiesUsed: ['Azure', '.NET', 'SQL Server', 'APIs', 'Kafka', 'Kubernetes', 'DevOps'],
    seo: {
      title: 'Core Banking Modernization Case Study | Mobiz',
      description: 'Legacy core banking system replaced with zero downtime. 100% on-time delivery for regional financial institution.',
    },
  },
  {
    _type: 'caseStudy',
    title: 'Manufacturing ERP Migration',
    slug: { _type: 'slug', current: 'manufacturing-erp-migration' },
    kicker: 'MANUFACTURING / ERP',
    cardHeadline: 'SAP S/4HANA Migration, 12 Global Sites',
    metricLarge: '12',
    metricContext: 'manufacturing sites migrated',
    industry: 'manufacturing',
    executionType: 'core-systems',
    challenge: 'Global manufacturer needed to migrate 12 production sites from legacy ERP to SAP S/4HANA. Required coordination across time zones, process standardization, and zero disruption to production schedules.',
    solution: 'Managed end-to-end ERP migration with standardized implementation approach and site-specific customization. Comprehensive data migration, user training, and hypercare support. Phased rollout minimizing business risk.',
    results: 'All 12 sites migrated successfully. Zero production disruptions. Standardized processes across global operations. 25% reduction in operational costs through process optimization.',
    technologiesUsed: ['SAP S/4HANA', 'Azure', 'ETL Tools', 'Data Migration', 'Change Management'],
    seo: {
      title: 'SAP S/4HANA Migration Case Study | Mobiz',
      description: 'SAP S/4HANA implementation across 12 global manufacturing sites. Zero disruption, on-time delivery.',
    },
  },
];

// Engagement Models Data
const engagementModels = [
  {
    _type: 'engagementModel',
    title: 'End-to-End Transformation',
    summary: 'Complete ownership from architecture to production. We design, build, and deploy mission-critical systems with zero handoffs.',
    pillars: [
      'Strategy & Architecture',
      'Full-Stack Development',
      'Production Deployment',
      'Post-Launch Support',
    ],
    ctaLabel: 'Discuss Your Transformation',
  },
  {
    _type: 'engagementModel',
    title: 'Strategic Acceleration',
    summary: 'Fast-track critical initiatives with embedded senior leadership. We bring strategy, architecture, and execution velocity.',
    pillars: [
      'Executive Partnership',
      'Technical Architecture',
      'Velocity Engineering',
      'Risk Mitigation',
    ],
    ctaLabel: 'Accelerate Your Initiative',
  },
  {
    _type: 'engagementModel',
    title: 'Capability Build',
    summary: 'Build specific capabilities within your organization. We deliver production systems while transferring knowledge.',
    pillars: [
      'Targeted Capabilities',
      'Knowledge Transfer',
      'Production Delivery',
      'Team Enablement',
    ],
    ctaLabel: 'Build Your Capability',
  },
  {
    _type: 'engagementModel',
    title: 'Embedded Execution Partner',
    summary: 'Integrated into your technology team. We operate as an extension of your organization with full accountability.',
    pillars: [
      'Team Integration',
      'Continuous Delivery',
      'Operational Excellence',
      'Shared Accountability',
    ],
    ctaLabel: 'Embed Our Team',
  },
];

// Homepage Data
const homepageData = {
  _type: 'homepage',
  _id: 'homepage',
  heroMetrics: [
    { value: '100%', label: 'Accountability' },
    { value: '$2B+', label: 'Value Delivered' },
    { value: 'Zero', label: 'Handoffs' },
  ],
  statsItems: [
    'Cloud Transformation',
    'AI/ML Platforms',
    'Digital Product Engineering',
    'Core System Modernization',
  ],
  accountabilityGapTitle: 'The Accountability Gap',
  accountabilityGapBody:
    'Traditional consulting is broken. Strategy firms deliver PowerPoints, then leave. System integrators deliver billable hours, but not the outcome. This creates an accountability gap where transformation fails. We close that gap.',
  modelItems: [
    {
      _type: 'modelItem',
      _key: 'clarity',
      number: '01',
      title: 'Clarity & Architecture',
      description:
        'We define the first-principles architecture and production roadmap. Technology-agnostic, built for your reality.',
    },
    {
      _type: 'modelItem',
      _key: 'velocity',
      number: '02',
      title: 'Velocity & Execution',
      description:
        'The team that designed it, builds it. We write the code, migrate the data, and integrate the systems.',
    },
    {
      _type: 'modelItem',
      _key: 'certainty',
      number: '03',
      title: 'Certainty & Deployment',
      description:
        'We own the "last mile" that others ignore. We\'re not done until you are live, stable, and scaled.',
    },
  ],
  deliveredStories: [
    {
      _type: 'story',
      _key: 'financial',
      client: 'Global Financial Services',
      metricValue: '2,000+',
      metricContext: 'apps migrated',
      description:
        'Zero-downtime cloud transformation. $47M in savings. Designed, built, and deployed by one team.',
    },
    {
      _type: 'story',
      _key: 'sanofi',
      client: 'Sanofi (Featured by Microsoft)',
      metricValue: '6',
      metricContext: 'months: concept to production',
      description:
        'AI platform for R&D, featured by Microsoft for its impact. Built and scaled by our team.',
      videoLink: {
        href: '#',
        label: 'Watch the Microsoft Case Study',
      },
    },
    {
      _type: 'story',
      _key: 'manufacturer',
      client: 'Global Manufacturer',
      metricValue: '140',
      metricContext: 'facilities connected',
      description:
        'Smart factory platform, built and deployed globally. 87% gain in production efficiency.',
    },
  ],
  recognitionItems: [
    {
      _type: 'recognitionItem',
      _key: 'clients',
      label: 'Clients',
      title: '30+ Fortune 500',
      source: 'Execution Partners',
    },
    {
      _type: 'recognitionItem',
      _key: 'value',
      label: 'Value',
      title: '$2B+ Delivered',
      source: 'In Production Value',
    },
    {
      _type: 'recognitionItem',
      _key: 'velocity',
      label: 'Velocity',
      title: '6-12 Months',
      source: 'Strategy to Production',
    },
  ],
  services: [
    {
      _type: 'service',
      _key: 'cloud',
      number: '01',
      title: 'Cloud Transformation',
      description:
        'Complete migrations, modernization, and cloud-native architecture executed with zero disruption.',
      outcome: '→ Outcome: 40% cost reduction',
    },
    {
      _type: 'service',
      _key: 'ai',
      number: '02',
      title: 'AI & Data Platforms',
      description:
        'From data architecture to production-grade models that turn your data into competitive advantage.',
      outcome: '→ Outcome: 3-6 month deployment',
    },
    {
      _type: 'service',
      _key: 'digital',
      number: '03',
      title: 'Digital Product Engineering',
      description:
        'Mission-critical customer experiences, platforms, and APIs engineered for enterprise performance.',
      outcome: '→ Outcome: 2.3x faster time-to-market',
    },
    {
      _type: 'service',
      _key: 'core',
      number: '04',
      title: 'Core System Modernization',
      description:
        'Replacing high-risk legacy systems and managing the complexity of ERP and SCM migrations end-to-end.',
      outcome: '→ Outcome: 100% on-time, on-budget',
    },
  ],
  partners: [
    { _type: 'partner', _key: 'microsoft', name: 'Microsoft', color: '#0067B8' },
    { _type: 'partner', _key: 'aws', name: 'AWS', color: '#FF9900' },
    { _type: 'partner', _key: 'gcp', name: 'Google Cloud', color: '#4285F4' },
    { _type: 'partner', _key: 'databricks', name: 'Databricks', color: '#FF3621' },
    { _type: 'partner', _key: 'snowflake', name: 'Snowflake', color: '#00A1E0' },
  ],
  industries: [
    {
      _type: 'industry',
      _key: 'financial',
      name: 'Financial Services',
      description:
        'Core banking platforms modernized. Trading systems rebuilt. Risk engines deployed.',
    },
    {
      _type: 'industry',
      _key: 'healthcare',
      name: 'Healthcare',
      description:
        'AI diagnostics operational. Patient platforms launched. Clinical systems integrated.',
    },
    {
      _type: 'industry',
      _key: 'manufacturing',
      name: 'Manufacturing',
      description:
        'Smart factories online. Supply chains digitized. Predictive maintenance running.',
    },
    {
      _type: 'industry',
      _key: 'energy',
      name: 'Energy',
      description:
        'Grid systems modernized. Renewable platforms deployed. Carbon tracking operational.',
    },
    {
      _type: 'industry',
      _key: 'retail',
      name: 'Retail',
      description:
        'Omnichannel platforms built. Inventory systems integrated. Customer experiences live.',
    },
    {
      _type: 'industry',
      _key: 'government',
      name: 'Government',
      description:
        'Citizen services digitized. Legacy systems replaced. Security frameworks implemented.',
    },
  ],
  contactTitle: 'An outcome, not an opinion.',
  contactDescription:
    "Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation.",
  contactCtaLabel: 'Start the Conversation',
  seo: {
    title: 'Mobiz - Strategy, Executed.',
    description:
      "We are the execution partner for F500 technology leaders. We don't just advise. We architect, build, and deploy the systems that define your future.",
    keywords: [
      'execution partner',
      'accountability gap',
      'enterprise technology execution',
      'azure implementation partner',
      'mobiz execution model',
    ],
  },
};

// Execution Page Data
const executionPageData = {
  _type: 'executionPage',
  _id: 'executionPage',
  title: 'Execution Hub',
  metaTitle: 'Enterprise Execution Services - Cloud, AI, Digital Product & Core Systems | Mobiz',
  metaDescription:
    'Full-stack execution capabilities across cloud transformation, AI platforms, digital product engineering, and core system modernization. One team, zero handoffs.',
  metaKeywords: [
    'enterprise execution partner',
    'full stack execution',
    'cloud transformation partner',
    'production ai execution',
    'digital product engineering',
    'legacy system modernization',
  ],
  heroKicker: 'Execution Hub',
  heroHeadline: 'We don\'t recommend. We execute.',
  heroSubheadline:
    'Our model is not theoretical. We deliver complex, production-grade systems across four core execution pillars.',
  servicesLabel: 'Full-Stack Execution',
  servicesTitle: 'Capabilities That Deliver',
  servicesDescription:
    'From strategy to production, we own the entire execution lifecycle. No handoffs, no excuses, just outcomes.',
  services: [
    {
      _type: 'service',
      _key: 'cloud',
      number: '01',
      title: 'Cloud Transformation',
      description:
        'Complete migrations, modernization, and cloud-native architecture executed with zero disruption.',
      outcome: '→ Outcome: 40% cost reduction',
    },
    {
      _type: 'service',
      _key: 'ai',
      number: '02',
      title: 'AI & Data Platforms',
      description:
        'From data architecture to production-grade models that turn your data into competitive advantage.',
      outcome: '→ Outcome: 3-6 month deployment',
    },
    {
      _type: 'service',
      _key: 'digital',
      number: '03',
      title: 'Digital Product Engineering',
      description:
        'Mission-critical customer experiences, platforms, and APIs engineered for enterprise performance.',
      outcome: '→ Outcome: 2.3x faster time-to-market',
    },
    {
      _type: 'service',
      _key: 'core',
      number: '04',
      title: 'Core System Modernization',
      description:
        'Replacing high-risk legacy systems and managing the complexity of ERP and SCM migrations end-to-end.',
      outcome: '→ Outcome: 100% on-time, on-budget',
    },
  ],
  ctaHeadline: 'Ready to execute?',
  ctaBody:
    "Stop talking about transformation. Start executing it. We're ready to build. Let's start the conversation.",
  ctaLabel: 'Start the Conversation',
};

// Delivered Value Page Data
const deliveredValuePageData = {
  _type: 'deliveredValuePage',
  _id: 'deliveredValuePage',
  title: 'Delivered Value',
  metaTitle: 'Case Studies & Results - Delivered Value in Production | Mobiz',
  metaDescription:
    'Real results from real execution. See how we\'ve delivered billions in value across industries through our unique execution model. Proof, not promises.',
  metaKeywords: [
    'execution partner results',
    'case studies',
    'azure transformation success',
    'production ai outcomes',
    'enterprise digital execution',
    'proven execution partner',
  ],
  heroKicker: 'Proof, Not Promises',
  heroHeadline: 'Delivered Value.',
  heroSubheadline:
    "Strategy is speculation. Execution is truth. Here's the proof of what happens when you eliminate the accountability gap.",
  storiesLabel: 'Real Results',
  storiesTitle: 'Value Delivered in Production',
  stories: [
    {
      _type: 'story',
      _key: 'financial',
      client: 'Global Financial Services',
      metricValue: '2,000+',
      metricContext: 'apps migrated',
      description:
        'Zero-downtime cloud transformation. $47M in savings. Designed, built, and deployed by one team.',
    },
    {
      _type: 'story',
      _key: 'sanofi',
      client: 'Sanofi (Featured by Microsoft)',
      metricValue: '6',
      metricContext: 'months: concept to production',
      description:
        'AI platform for R&D, featured by Microsoft for its impact. Built and scaled by our team.',
      videoLink: {
        href: '#',
        label: 'Watch the Microsoft Case Study',
      },
    },
    {
      _type: 'story',
      _key: 'manufacturer',
      client: 'Global Manufacturer',
      metricValue: '140',
      metricContext: 'facilities connected',
      description:
        'Smart factory platform, built and deployed globally. 87% gain in production efficiency.',
    },
  ],
  ctaHeadline: 'Ready for real results?',
  ctaBody:
    "Stop paying for PowerPoints. Start getting outcomes. We're ready to execute your transformation.",
  ctaLabel: 'Start the Conversation',
};

// Main execution function
async function populateSanity() {
  console.log('🚀 Starting Sanity content population...\n');

  try {
    // Check if token exists
    if (!process.env.SANITY_API_TOKEN) {
      throw new Error('SANITY_API_TOKEN not found in environment variables');
    }

    console.log('✓ Sanity client configured');
    console.log(`  Project ID: ${client.config().projectId}`);
    console.log(`  Dataset: ${client.config().dataset}\n`);

    // Create Service Pages
    console.log('📄 Creating 5 Service Pages...');
    for (const service of servicePages) {
      try {
        await client.create(service);
        console.log(`  ✓ Created: ${service.title} (${service.slug.current})`);
      } catch (error: any) {
        if (error.message.includes('already exists')) {
          console.log(`  ⚠ Skipped: ${service.title} (already exists)`);
        } else {
          throw error;
        }
      }
    }

    // Create Case Studies
    console.log('\n📊 Creating 8 Case Studies...');
    for (const caseStudy of caseStudies) {
      try {
        await client.create(caseStudy);
        console.log(`  ✓ Created: ${caseStudy.title}`);
      } catch (error: any) {
        if (error.message.includes('already exists')) {
          console.log(`  ⚠ Skipped: ${caseStudy.title} (already exists)`);
        } else {
          throw error;
        }
      }
    }

    // Create Engagement Models
    console.log('\n🤝 Creating 4 Engagement Models...');
    for (const model of engagementModels) {
      try {
        await client.create(model);
        console.log(`  ✓ Created: ${model.title}`);
      } catch (error: any) {
        if (error.message.includes('already exists')) {
          console.log(`  ⚠ Skipped: ${model.title} (already exists)`);
        } else {
          throw error;
        }
      }
    }

    // Create Homepage Document
    console.log('\n🏠 Creating Homepage Document...');
    try {
      await client.create(homepageData);
      console.log('  ✓ Created: Homepage');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('  ⚠ Skipped: Homepage (already exists)');
      } else {
        throw error;
      }
    }

    // Create Execution Page Document
    console.log('\n⚡ Creating Execution Hub Document...');
    try {
      await client.create(executionPageData);
      console.log('  ✓ Created: Execution Hub Page');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('  ⚠ Skipped: Execution Hub Page (already exists)');
      } else {
        throw error;
      }
    }

    // Create Delivered Value Page Document
    console.log('\n📈 Creating Delivered Value Document...');
    try {
      await client.create(deliveredValuePageData);
      console.log('  ✓ Created: Delivered Value Page');
    } catch (error: any) {
      if (error.message.includes('already exists')) {
        console.log('  ⚠ Skipped: Delivered Value Page (already exists)');
      } else {
        throw error;
      }
    }

    console.log('\n✅ Sanity content population complete!\n');
    console.log('📊 Summary:');
    console.log(`  - 1 Homepage`);
    console.log(`  - ${servicePages.length} Service Pages`);
    console.log(`  - ${caseStudies.length} Case Studies`);
    console.log(`  - ${engagementModels.length} Engagement Models`);
    console.log(`  - 1 Execution Hub Page`);
    console.log(`  - 1 Delivered Value Page\n`);
    console.log('🎉 Your content is ready to view!');
    console.log(`   Visit: https://${client.config().projectId}.sanity.studio\n`);

  } catch (error) {
    console.error('\n❌ Error populating Sanity:', error);
    process.exit(1);
  }
}

// Run the script
populateSanity();
