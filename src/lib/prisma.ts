import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveDbUrl(raw: string): string {
  // "file:./dev.db" di-resolve relatif ke root proyek (cwd saat runtime)
  return raw.startsWith("file:") ? `file:${path.resolve(/*turbopackIgnore: true*/ process.cwd(), raw.slice(5))}` : raw;
}

function createClient() {
  const adapter = new PrismaBetterSqlite3({
    url: resolveDbUrl(process.env.DATABASE_URL ?? "file:./dev.db"),
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;