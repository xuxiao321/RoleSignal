import type { Metadata } from "next";
import { RoleExplorer } from "@/components/RoleExplorer";
import { roleProfiles } from "@/lib/roleData";

export const metadata: Metadata = {
  title: "RoleSignal | Compare Job Posting Gaps and Employee Reports",
  description:
    "RoleSignal structures official posting disclosures, missing decision gaps, and employee-reported role data across compensation, WLB, hours, on-call, benefits, and promotion.",
  alternates: {
    canonical: "/",
  },
};

type HomeProps = {
  searchParams?: Promise<{
    selected?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const selectedSlug = roleProfiles.some((profile) => profile.slug === params?.selected)
    ? params?.selected
    : undefined;

  return (
    <RoleExplorer
      key={selectedSlug ?? "default-role-selection"}
      profiles={roleProfiles}
      initialSelectedSlug={selectedSlug}
    />
  );
}
