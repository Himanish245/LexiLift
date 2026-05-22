import { homePage } from "./documents/homePage";
import { pricingPage } from "./documents/pricingPage";
import { aboutPage } from "./documents/aboutPage";
import { contactPage } from "./documents/contactPage";
import { blogPost } from "./documents/blogPost";
import { author } from "./documents/author";
import { category } from "./documents/category";
import { teamMember } from "./documents/teamMember";
import { siteSettings } from "./documents/siteSettings";
import { seo } from "./objects/seo";
import { link } from "./objects/link";
import { feature } from "./objects/feature";

import { user } from "./documents/user";

export const schemas = [
  // Documents
  homePage,
  pricingPage,
  aboutPage,
  contactPage,
  blogPost,
  author,
  category,
  teamMember,
  siteSettings,
  user,
  // Objects
  seo,
  link,
  feature,
];
