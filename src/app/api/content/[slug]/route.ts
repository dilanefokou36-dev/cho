import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const content = await prisma.siteContent.findUnique({ where: { slug } });
  if (!content) {
    return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
  }
  return NextResponse.json(content);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { slug } = await params;
  const { title, content } = await request.json();
  const userId = parseInt((session.user as Record<string, unknown>).id as string);

  const updated = await prisma.siteContent.upsert({
    where: { slug },
    update: { title, content, updatedBy: userId },
    create: { slug, title, content, updatedBy: userId },
  });

  return NextResponse.json(updated);
}
