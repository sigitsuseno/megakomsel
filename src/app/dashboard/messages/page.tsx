import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-ink">Pesan Masuk</h1>
        <p className="text-sm text-ink/60">{messages.length} pesan dari form kontak.</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-ink/60">Belum ada pesan masuk.</p>
        ) : (
          messages.map((m) => (
            <article key={m.id} className="p-5 rounded-2xl border border-line bg-card">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-heading font-bold text-ink">{m.name}</h2>
                  <p className="text-xs text-ink/60">
                    {m.email} • {m.phone}
                    {m.company ? ` • ${m.company}` : ""}
                    {m.service ? ` • ${m.service}` : ""}
                  </p>
                </div>
                <time className="text-xs text-ink/50">{formatDate(m.createdAt)}</time>
              </div>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">{m.message}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
