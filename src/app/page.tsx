import type { Metadata } from "next";
import { RoleExplorer } from "@/components/RoleExplorer";
import { roleProfiles } from "@/lib/roleData";

export const metadata: Metadata = {
  title: "RoleSignal | Company Role Decision Intelligence",
  description:
    "RoleSignal MVP structures company and role signals across compensation, WLB, on-call, benefits, promotion speed, and confidence.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return <RoleExplorer profiles={roleProfiles} />;
}
