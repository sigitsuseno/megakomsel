"use server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export type ContactState = { error?: string; success?: string } | undefined;

export async function submitContactAction(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") || "",
    service: formData.get("service") || "",
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Periksa kembali isian Anda." };
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    },
  });

  return { success: "Pesan terkirim! Tim kami akan menghubungi Anda secepatnya." };
}