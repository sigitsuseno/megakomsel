import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
const dbUrl = rawUrl.startsWith("file:") ? `file:${path.resolve(process.cwd(), rawUrl.slice(5))}` : rawUrl;
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  await prisma.user.upsert({
    where: { email: "admin@megakomsel.com" },
    update: {},
    create: {
      name: "Admin Megakomsel",
      email: "admin@megakomsel.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@megakomsel.com" },
    update: {},
    create: {
      name: "Budi Santoso",
      email: "customer@megakomsel.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
    },
  });

  const categories = [
    { name: "Laptop", slug: "laptop" },
    { name: "PC & Workstation", slug: "pc-workstation" },
    { name: "CCTV & Security", slug: "cctv-security" },
    { name: "Jaringan", slug: "jaringan" },
    { name: "Server & Storage", slug: "server-storage" },
    { name: "Aksesoris", slug: "aksesoris" },
  ];

  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
    categoryMap[c.slug] = created.id;
  }

  const products = [
    {
      name: "Lenovo ThinkPad X1 Carbon Gen 11",
      slug: "lenovo-thinkpad-x1-carbon-gen-11",
      categorySlug: "laptop",
      description:
        "Laptop bisnis ultraportable 14\" dengan prosesor Intel Core i7, RAM 16GB, SSD 512GB NVMe, dan baterai tahan seharian. Garansi resmi 3 tahun.",
      price: 24500000,
      stock: 8,
      featured: true,
    },
    {
      name: "HP EliteBook 840 G10",
      slug: "hp-elitebook-840-g10",
      categorySlug: "laptop",
      description:
        "Laptop enterprise 14\" dengan Intel Core i5-1335U, RAM 16GB, SSD 512GB, layar FHD anti-glare, dan fitur keamanan HP Sure Start.",
      price: 18900000,
      stock: 12,
      featured: true,
    },
    {
      name: "Apple MacBook Air M2 13\"",
      slug: "apple-macbook-air-m2-13",
      categorySlug: "laptop",
      description:
        "MacBook Air dengan chip Apple M2, RAM 8GB, SSD 256GB, layar Liquid Retina, dan baterai hingga 18 jam.",
      price: 16999000,
      stock: 5,
      featured: true,
    },
    {
      name: "PC Workstation Intel Core i9 + RTX 4070",
      slug: "pc-workstation-i9-rtx-4070",
      categorySlug: "pc-workstation",
      description:
        "Workstation untuk desain, editing video, dan rendering 3D. Intel Core i9-13900K, 64GB DDR5, RTX 4070 12GB, SSD 1TB NVMe.",
      price: 32500000,
      stock: 3,
      featured: false,
    },
    {
      name: "PC Rakitan Office Intel i5",
      slug: "pc-rakitan-office-i5",
      categorySlug: "pc-workstation",
      description:
        "Paket PC kantor: Intel Core i5-12400, RAM 16GB, SSD 512GB, monitor 24\", keyboard + mouse. Siap pakai dengan OS berlisensi.",
      price: 7850000,
      stock: 20,
      featured: true,
    },
    {
      name: "IP Camera Hikvision DS-2CD2143G2-I 4MP",
      slug: "hikvision-ds-2cd2143g2-i-4mp",
      categorySlug: "cctv-security",
      description:
        "IP Camera dome 4MP dengan IR 30m, AcuSense human/vehicle detection, PoE, dan IP67. Cocok untuk indoor/outdoor.",
      price: 1850000,
      stock: 50,
      featured: true,
    },
    {
      name: "NVR Hikvision DS-7616NI-I2 16 Channel",
      slug: "hikvision-ds-7616ni-i2",
      categorySlug: "cctv-security",
      description:
        "Network Video Recorder 16 channel, support 4K, H.265+, dan akses remote via smartphone/PC.",
      price: 5400000,
      stock: 6,
      featured: false,
    },
    {
      name: "RouterBoard MikroTik RB4011iGS+",
      slug: "mikrotik-rb4011igs",
      categorySlug: "jaringan",
      description:
        "Router enterprise 10-port (8x GbE, 2x SFP+ 10Gbps) dengan CPU quad-core. Ideal untuk kantor skala menengah.",
      price: 3450000,
      stock: 15,
      featured: false,
    },
    {
      name: "Switch Cisco Catalyst CBS250-24T-4G",
      slug: "cisco-catalyst-cbs250-24t-4g",
      categorySlug: "jaringan",
      description:
        "Managed switch 24 port Gigabit + 4 port SFP, support VLAN, PoE optional, dan manajemen cloud Cisco.",
      price: 7250000,
      stock: 10,
      featured: false,
    },
    {
      name: "NAS Synology DS923+ 4-Bay",
      slug: "synology-ds923-plus",
      categorySlug: "server-storage",
      description:
        "NAS 4-bay untuk kantor: backup, file sharing, dan media server. Prosesor Ryzen R1600, upgradeable hingga 32GB RAM.",
      price: 9800000,
      stock: 4,
      featured: true,
    },
    {
      name: "UPS APC Back-UPS BX950MI",
      slug: "apc-back-ups-bx950mi",
      categorySlug: "aksesoris",
      description:
        "UPS 950VA untuk melindungi PC, server kecil, dan perangkat jaringan dari mati listrik mendadak.",
      price: 1450000,
      stock: 25,
      featured: false,
    },
    {
      name: "Monitor Dell 27\" P2723DE QHD USB-C",
      slug: "dell-p2723de-qhd-usbc",
      categorySlug: "aksesoris",
      description:
        "Monitor 27\" QHD 2560x1440 dengan USB-C 90W, hub USB, dan akurasi warna baik untuk produktivitas.",
      price: 5400000,
      stock: 18,
      featured: false,
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) continue;
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: p.stock,
        featured: p.featured,
        active: true,
        image: `https://picsum.photos/seed/${p.slug}/600/450`,
        categoryId: categoryMap[p.categorySlug],
      },
    });
  }

  console.log("Seed selesai.");
  console.log("Admin    : admin@megakomsel.com / admin123");
  console.log("Customer : customer@megakomsel.com / customer123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });