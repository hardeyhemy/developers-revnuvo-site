import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://developers.revnuvo.site";
  const routes = ["", "/sdk", "/gateway", "/apis", "/docs"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
