import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }

  const bookId = parseInt(params.id);
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.libraireId !== libraire.id) {
    return Response.json({ error: "Livre introuvable" }, { status: 404 });
  }

  return Response.json(book);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }

  const bookId = parseInt(params.id);
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.libraireId !== libraire.id) {
    return Response.json({ error: "Livre introuvable" }, { status: 404 });
  }

  if (libraire.validUntil && new Date(libraire.validUntil) < new Date()) {
    return Response.json(
      { error: "Votre période d'autorisation de publication a expiré. Veuillez contacter l'administration." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const { title, author, description, price, category, imageUrl, status } = body;

  const data: Record<string, unknown> = {};
  if (title !== undefined) data.title = title;
  if (author !== undefined) data.author = author || null;
  if (description !== undefined) data.description = description || null;
  if (price !== undefined) data.price = price != null ? parseFloat(price) : null;
  if (category !== undefined) data.category = category || null;
  if (imageUrl !== undefined) data.imageUrl = imageUrl || null;
  if (status !== undefined) data.status = status;

  const updated = await prisma.book.update({
    where: { id: bookId },
    data,
  });

  return Response.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const libraire = await prisma.libraire.findUnique({ where: { userId } });
  if (!libraire) {
    return Response.json({ error: "Profil libraire introuvable" }, { status: 404 });
  }

  const bookId = parseInt(params.id);
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.libraireId !== libraire.id) {
    return Response.json({ error: "Livre introuvable" }, { status: 404 });
  }

  await prisma.book.delete({ where: { id: bookId } });

  return Response.json({ success: true });
}
