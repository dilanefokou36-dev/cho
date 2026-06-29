import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const id = parseInt(params.id);
  const libraire = await prisma.libraire.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true, phone: true } },
      books: { orderBy: { createdAt: "desc" } },
      _count: { select: { books: true } },
    },
  });

  if (!libraire) {
    return Response.json({ error: "Libraire introuvable" }, { status: 404 });
  }

  return Response.json(libraire);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Non authentifié" }, { status: 401 });
  }

  const adminId = parseInt(
    (session.user as Record<string, unknown>).id as string,
  );
  const id = parseInt(params.id);

  const body = await req.json();
  const { status, validityDays } = body;

  const libraire = await prisma.libraire.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!libraire) {
    return Response.json({ error: "Libraire introuvable" }, { status: 404 });
  }

  if (status === "REVOKED") {
    const updated = await prisma.libraire.update({
      where: { id },
      data: { status: "PENDING", validUntil: null },
    });

    await prisma.message.create({
      data: {
        subject: "Vos droits de publication ont été révoqués",
        content: `Bonjour, les droits de publication de votre librairie "${libraire.storeName}" ont été révoqués par l'administration. Vous ne pouvez plus publier de nouveaux livres pour le moment.`,
        senderId: adminId,
        receiverId: libraire.userId,
        libraireId: libraire.id,
      },
    });

    return Response.json(updated);
  }

  if (!status || !["APPROVED", "REJECTED"].includes(status)) {
    return Response.json(
      { error: "Statut invalide. Utilisez APPROVED ou REJECTED." },
      { status: 400 },
    );
  }

  const data: Record<string, unknown> = { status };

  if (status === "APPROVED") {
    if (validityDays != null && typeof validityDays === "number" && validityDays > 0) {
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + validityDays);
      data.validUntil = validUntil;
    } else {
      data.validUntil = null;
    }
  }

  const updated = await prisma.libraire.update({
    where: { id },
    data,
  });

  const notificationSubject =
    status === "APPROVED"
      ? "Votre compte libraire a été approuvé"
      : "Votre compte libraire a été refusé";

  const notificationContent =
    status === "APPROVED"
      ? `Félicitations ! Votre compte libraire "${libraire.storeName}" a été approuvé. Vous pouvez maintenant publier des livres sur la plateforme.${updated.validUntil ? ` Cette autorisation expire le ${updated.validUntil.toLocaleDateString("fr-FR")}.` : ""}`
      : `Nous sommes désolés, votre compte libraire "${libraire.storeName}" a été refusé. Veuillez contacter l'administration pour plus d'informations.`;

  await prisma.message.create({
    data: {
      subject: notificationSubject,
      content: notificationContent,
      senderId: adminId,
      receiverId: libraire.userId,
      libraireId: libraire.id,
    },
  });

  return Response.json(updated);
}
