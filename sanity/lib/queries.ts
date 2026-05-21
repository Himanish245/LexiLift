import { groq } from "next-sanity";

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    logo,
    favicon,
    navLinks[] { label, href, isExternal },
    footerLinks[] { label, href, isExternal },
    socialLinks[] { platform, url },
    defaultSeo { metaTitle, metaDescription, ogImage }
  }
`;

// Home Page
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitle,
    heroHighlight,
    heroSubtitle,
    heroTagline,
    heroCtaPrimary { label, href, isExternal },
    heroCtaSecondary { label, href, isExternal },
    trustedByLogos[] { name, logo },
    featuresHeadline,
    featuresTagline,
    features[] { icon, title, description },
    howItWorksHeadline,
    howItWorksSteps[] { title, description, icon },
    ctaTitle,
    ctaHighlight,
    ctaSubtitle,
    ctaButton { label, href, isExternal },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Pricing Page
export const pricingPageQuery = groq`
  *[_type == "pricingPage"][0] {
    headline,
    subtitle,
    tiers[] {
      name,
      description,
      priceMonthly,
      priceYearly,
      interval,
      features,
      ctaText,
      ctaLink,
      highlighted,
      badge
    },
    faqs[] { question, answer },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// About Page
export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    headline,
    headlineHighlight,
    subtitle,
    missionTitle,
    missionBody,
    storyTitle,
    storyBody,
    values[] { icon, title, description },
    teamMembers[]-> {
      _id,
      name,
      role,
      image,
      bio,
      socialLinks[] { platform, url }
    },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Contact Page
export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    headline,
    subtitle,
    formHeading,
    calendarHeading,
    calendarEmbedUrl,
    contactEmail,
    contactPhone,
    socialLinks[] { platform, url },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// Blog List
export const blogListQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    featured,
    author-> { name, image },
    categories[]-> { title, slug }
  }
`;

// Blog Post by Slug
export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    body,
    publishedAt,
    author-> { name, image, bio, role },
    categories[]-> { title, slug },
    seo { metaTitle, metaDescription, ogImage }
  }
`;

// All blog slugs for generateStaticParams
export const blogSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] {
    "slug": slug.current
  }
`;

// Categories
export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`;
