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

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: { select: { id: true, name: true, email: true } },
      receiver: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(messages);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const { subject, content, receiverId } = await req.json();

  if (!content || typeof content !== "string" || !content.trim()) {
    return Response.json({ error: "Le contenu du message est requis" }, { status: 400 });
  }

  if (!receiverId) {
    return Response.json({ error: "Le destinataire est requis" }, { status: 400 });
  }

  const receiver = await prisma.user.findUnique({
    where: { id: parseInt(receiverId) },
  });
  if (!receiver) {
    return Response.json({ error: "Destinataire introuvable" }, { status: 404 });
  }

  const libraire = await prisma.libraire.findUnique({ where: { userId } });

  const message = await prisma.message.create({
    data: {
      subject: subject || null,
      content,
      senderId: userId,
      receiverId: parseInt(receiverId),
      libraireId: libraire?.id || null,
    },
  });

  return Response.json(message, { status: 201 });
}
