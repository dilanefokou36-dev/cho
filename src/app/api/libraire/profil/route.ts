import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);

  let libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    libraire = await prisma.libraire.create({
      data: {
        userId,
        storeName: session.user.name || "Ma librairie",
      },
    });
  }

  return Response.json(libraire);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);

  const existing = await prisma.libraire.findUnique({ where: { userId } });
  if (!existing) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }

  const body = await req.json();
  const { storeName, description, address, phone, website } = body;

  const updated = await prisma.libraire.update({
    where: { userId },
    data: {
      storeName: storeName ?? existing.storeName,
      description: description ?? existing.description,
      address: address ?? existing.address,
      phone: phone ?? existing.phone,
      website: website ?? existing.website,
    },
  });

  return Response.json(updated);
}
