import { flavours } from "@/data/flavours";
import { siteUrl } from "@/lib/site";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...flavours.map((flavour) => ({
      url: `${siteUrl}/flavours/${flavour.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
