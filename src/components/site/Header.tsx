import { getSession } from "@/lib/auth";
import { COMPANY } from "@/lib/site";
import { HeaderClient } from "@/components/site/HeaderClient";

export async function Header() {
  const session = await getSession();
  return <HeaderClient session={session} company={COMPANY} />;
}
