import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const userId = parseInt((session.user as Record<string, unknown>).id as string);
  const id = parseInt(params.id);

  const message = await prisma.message.findUnique({ where: { id } });

  if (!message) {
    return Response.json({ error: "Message introuvable" }, { status: 404 });
  }

  if (message.receiverId !== userId) {
    return Response.json({ error: "Vous n'êtes pas le destinataire de ce message" }, { status: 403 });
  }

  const updated = await prisma.message.update({
    where: { id },
    data: { read: true },
  });

  return Response.json(updated);
}
