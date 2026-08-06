import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COMPANY, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";
import { StoreHeaderClient } from "@/components/store/StoreHeaderClient";

export async function StoreHeader() {
  const [session, company, categories] = await Promise.all([
    getSession(),
    getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  return (
    <StoreHeaderClient
      session={session}
      company={company}
      categories={categories}
    />
  );
}
