import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || projectId === 'your-project-id') {
  console.error("Error: Please set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local");
  process.exit(1);
}

if (!token || token === 'your_write_token') {
  console.error("Error: Please set SANITY_API_WRITE_TOKEN in .env.local");
  console.error("You can generate a token at https://sanity.io/manage");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  token,
  apiVersion: '2026-05-21',
});

const siteSettings = {
  _type: 'siteSettings',
  _id: 'siteSettings',
  siteName: 'LexiLift',
  navLinks: [
    { _key: '1', label: 'Features', href: '/#features' },
    { _key: '2', label: 'Pricing', href: '/pricing' },
    { _key: '3', label: 'About', href: '/about' },
    { _key: '4', label: 'Blog', href: '/blog' },
  ],
  footerLinks: [
    { _key: '1', label: 'Privacy Policy', href: '#' },
    { _key: '2', label: 'Terms of Service', href: '#' },
    { _key: '3', label: 'Contact', href: '/contact' },
  ],
  defaultSeo: {
    metaTitle: 'LexiLift - The AI Knowledge Base',
    metaDescription: 'Instantly access exact information when you need it.',
  }
};

const homePage = {
  _type: 'homePage',
  _id: 'homePage',
  heroTitle: 'Transform Your Team\'s Knowledge into',
  heroHighlight: 'Instant Answers.',
  heroSubtitle: 'Stop wasting hours searching through Slack threads and outdated wikis. LexiLift connects to your tools and delivers accurate, cited answers instantly.',
  heroTagline: 'THE NEXT GENERATION OF KNOWLEDGE MANAGEMENT',
  heroCtaPrimary: { label: 'Start Free Trial', href: '/pricing' },
  heroCtaSecondary: { label: 'Book a Demo', href: '/contact' },
  trustedByLogos: [
    { _key: '1', name: 'Acme Corp' },
    { _key: '2', name: 'Globex' },
    { _key: '3', name: 'Soylent' },
  ],
  featuresHeadline: 'Everything you need to scale knowledge',
  featuresTagline: 'FEATURES',
  features: [
    { _key: '1', icon: '🧠', title: 'Context-Aware AI', description: 'Understands the nuances of your company\'s specific terminology.' },
    { _key: '2', icon: '⚡', title: 'Lightning Fast', description: 'Get answers in milliseconds, not minutes.' },
    { _key: '3', icon: '🔒', title: 'Enterprise Security', description: 'Your data never leaves your secure tenant.' },
    { _key: '4', icon: '🔗', title: 'Seamless Integrations', description: 'Connects with Notion, Slack, Google Drive, and more.' }
  ],
  howItWorksHeadline: 'How LexiLift Works',
  howItWorksSteps: [
    { _key: '1', title: 'Connect Your Sources', description: 'Securely link your existing tools in just a few clicks.', icon: '🔌' },
    { _key: '2', title: 'AI Processing', description: 'Our models ingest, index, and understand your company knowledge.', icon: '⚙️' },
    { _key: '3', title: 'Ask Anything', description: 'Ask questions in natural language and get cited answers instantly.', icon: '💬' }
  ],
  ctaTitle: 'Ready to transform how your team',
  ctaHighlight: 'shares knowledge?',
  ctaSubtitle: 'Join thousands of modern teams building a faster, smarter workplace.',
  ctaButton: { label: 'Get Started for Free', href: '/pricing' },
  seo: {
    metaTitle: 'LexiLift - AI Knowledge Base',
    metaDescription: 'Stop wasting hours searching. LexiLift delivers accurate, cited answers instantly.'
  }
};

const pricingPage = {
  _type: 'pricingPage',
  _id: 'pricingPage',
  headline: 'Simple, Transparent Pricing',
  subtitle: 'Choose the right plan for your team\'s knowledge needs.',
  tiers: [
    {
      _key: '1',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      priceMonthly: '$0',
      interval: '/mo',
      features: ['Up to 3 team members', '1,000 document queries', 'Community support'],
      ctaText: 'Start Free',
      ctaLink: '/contact'
    },
    {
      _key: '2',
      name: 'Pro',
      description: 'For growing teams that need more power',
      priceMonthly: '$49',
      interval: '/mo',
      features: ['Unlimited team members', 'Unlimited queries', 'Priority email support', 'Advanced analytics'],
      ctaText: 'Start Free Trial',
      ctaLink: '/contact',
      highlighted: true,
      badge: 'MOST POPULAR'
    },
    {
      _key: '3',
      name: 'Enterprise',
      description: 'Custom solutions for large organizations',
      priceMonthly: 'Custom',
      interval: '',
      features: ['Custom deployments', 'Dedicated account manager', 'SLA guarantees', 'Custom integrations'],
      ctaText: 'Contact Sales',
      ctaLink: '/contact'
    }
  ],
  faqs: [
    { _key: '1', question: 'How does billing work?', answer: 'We bill monthly or annually. You can cancel at any time.' },
    { _key: '2', question: 'Do you offer a free trial?', answer: 'Yes! Our Pro plan comes with a 14-day free trial.' },
    { _key: '3', question: 'Is my data secure?', answer: 'Absolutely. We use enterprise-grade encryption and never train our public models on your private data.' }
  ],
  seo: {
    metaTitle: 'LexiLift Pricing',
    metaDescription: 'Simple, transparent pricing for teams of all sizes.'
  }
};

const teamMember1 = {
  _type: 'teamMember',
  _id: 'teamMember-jane-doe',
  name: 'Jane Doe',
  role: 'CEO & Founder',
  bio: 'Former engineering lead at a Fortune 500 tech company.'
};

const aboutPage = {
  _type: 'aboutPage',
  _id: 'aboutPage',
  headline: 'We\'re building the future of',
  headlineHighlight: 'knowledge work.',
  subtitle: 'LexiLift was founded to solve a simple problem: teams spend too much time searching for information and too little time acting on it.',
  missionTitle: 'Our Mission',
  missionBody: 'We believe that knowledge should flow freely within an organization. By leveraging advanced AI and retrieval-augmented generation, we\'re making it possible for anyone to instantly access the exact information they need, right when they need it.',
  storyTitle: 'Our Story',
  storyBody: 'Started in 2026, LexiLift grew out of our own frustration with scattered documentation, outdated wikis, and endless Slack searches. We built the tool we wanted to use, and now we\'re sharing it with the world.',
  values: [
    { _key: '1', icon: '⚡', title: 'Speed', description: 'Answers should be instant. We optimize for millisecond responses.' },
    { _key: '2', icon: '🎯', title: 'Accuracy', description: 'Hallucinations are unacceptable. Every answer must be cited.' },
    { _key: '3', icon: '🔒', title: 'Security', description: 'Your data is yours. We build with privacy and security first.' }
  ],
  teamMembers: [
    { _key: '1', _type: 'reference', _ref: 'teamMember-jane-doe' }
  ],
  seo: {
    metaTitle: 'About LexiLift',
    metaDescription: 'Our mission is to make organizational knowledge instantly accessible.'
  }
};

const contactPage = {
  _type: 'contactPage',
  _id: 'contactPage',
  headline: 'Let\'s Talk',
  subtitle: 'Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.',
  formHeading: 'Send us a message',
  calendarHeading: 'Book a Live Demo',
  contactEmail: 'hello@lexilift.com',
  seo: {
    metaTitle: 'Contact LexiLift',
    metaDescription: 'Get in touch with the LexiLift team.'
  }
};

async function seed() {
  try {
    console.log('Starting Sanity content seed...');
    
    await client.createOrReplace(siteSettings);
    console.log('✅ Site Settings created');
    
    await client.createOrReplace(homePage);
    console.log('✅ Home Page created');
    
    await client.createOrReplace(pricingPage);
    console.log('✅ Pricing Page created');
    
    await client.createOrReplace(teamMember1);
    console.log('✅ Team Member created');
    
    await client.createOrReplace(aboutPage);
    console.log('✅ About Page created');
    
    await client.createOrReplace(contactPage);
    console.log('✅ Contact Page created');
    
    console.log('\n🎉 Successfully seeded all content to Sanity!');
  } catch (error) {
    console.error('❌ Error seeding content:', error);
  }
}

seed();
