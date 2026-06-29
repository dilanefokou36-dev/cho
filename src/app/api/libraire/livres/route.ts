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
  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }

  const books = await prisma.book.findMany({
    where: { libraireId: libraire.id },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(books);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }
  if (libraire.status !== "APPROVED") {
    return Response.json(
      { error: "Votre compte libraire doit être approuvé avant d'ajouter des livres" },
      { status: 403 }
    );
  }

  if (libraire.validUntil && new Date(libraire.validUntil) < new Date()) {
    return Response.json(
      { error: "Votre période d'autorisation de publication a expiré. Veuillez contacter l'administration." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, author, description, price, category, imageUrl } = body;

  if (!title || typeof title !== "string") {
    return Response.json({ error: "Le titre est requis" }, { status: 400 });
  }

  const book = await prisma.book.create({
    data: {
      libraireId: libraire.id,
      title,
      author: author || null,
      description: description || null,
      price: price != null ? parseFloat(price) : null,
      category: category || null,
      imageUrl: imageUrl || null,
    },
  });

  return Response.json(book, { status: 201 });
}
