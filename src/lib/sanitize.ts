/**
 * Bersihkan kode SVG dari elemen/atribut berbahaya sebelum dirender
 * via dangerouslySetInnerHTML. Konten dikelola ADMIN, pembersihan ini
 * bersifat lapisan keamanan tambahan karena SVG tampil di halaman publik.
 */
export function sanitizeSvg(input: string): string {
  let s = input.trim();

  // buang blok <script>...</script> dan tag script mandiri
  s = s.replace(/<\s*script[\s\S]*?<\s*\/\s*script\s*>/gi, "");
  s = s.replace(/<\s*script[^>]*>/gi, "");

  // buang foreignObject (bisa menyisipkan HTML berbahaya ke dalam SVG)
  s = s.replace(/<\s*foreignObject[\s\S]*?<\s*\/\s*foreignObject\s*>/gi, "");
  s = s.replace(/<\s*foreignObject[^>]*>/gi, "");

  // buang atribut event handler (onload, onclick, dll.)
  s = s.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // buang skema URI javascript:
  s = s.replace(/javascript:/gi, "");

  return s;
}
