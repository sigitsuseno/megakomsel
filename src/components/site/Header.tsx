import { getSession } from "@/lib/auth";
import { COMPANY, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";
import { HeaderClient } from "@/components/site/HeaderClient";

export async function Header() {
  const [session, company] = await Promise.all([
    getSession(),
    getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY),
  ]);
  return <HeaderClient session={session} company={company} />;
}
