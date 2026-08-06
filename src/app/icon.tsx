import { ImageResponse } from "next/og";
import { COMPANY, type CompanySetting } from "@/lib/site";
import { getSettingJson, SETTING_KEYS } from "@/lib/settings";

export const runtime = "nodejs";
// Baca setting per request supaya favicon dari Dashboard → WEB UI → Setting langsung tampil.
export const dynamic = "force-dynamic";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Ikon situs dinamis.
 * Bila admin mengisi favicon di Setting, dialihkan ke file tersebut
 * (mendukung .ico/.png/.svg/.webp). Kalau kosong, tampilkan huruf "M".
 */
export default async function Icon() {
  const company = await getSettingJson<CompanySetting>(SETTING_KEYS.company, COMPANY);

  if (company.favicon) {
    return new Response(null, {
      status: 302,
      headers: { Location: company.favicon },
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B4F8A 0%, #18BFFF 100%)",
          borderRadius: 14,
          fontSize: 40,
          fontWeight: 800,
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        M
      </div>
    ),
    size
  );
}
