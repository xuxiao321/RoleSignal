import type { MetadataRoute } from "next";
import { roleProfiles } from "@/lib/roleData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rolesignal.example";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...roleProfiles.map((profile) => ({
      url: `${baseUrl}/roles/${profile.slug}`,
      lastModified: new Date(profile.lastUpdated),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
