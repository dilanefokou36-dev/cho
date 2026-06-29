import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const id = parseInt(params.id);

  const body = await req.json();
  const { status } = body;

  if (!status || !["APPROVED", "REJECTED"].includes(status)) {
    return Response.json(
      { error: "Statut invalide. Utilisez APPROVED ou REJECTED." },
      { status: 400 },
    );
  }

  const book = await prisma.book.findUnique({ where: { id } });

  if (!book) {
    return Response.json({ error: "Livre introuvable" }, { status: 404 });
  }

  const updated = await prisma.book.update({
    where: { id },
    data: { status },
  });

  return Response.json(updated);
}
