export const CMS_CONFIG = {
  baseUrl: process.env.CMS_URL || "",
  apiToken: process.env.STRAPI_API_TOKEN || "",
  endpoints: {
    Projects: "/api/projects",
  },
};
