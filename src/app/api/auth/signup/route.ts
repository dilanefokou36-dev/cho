import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, password, role, storeName, phone, city } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const userRole = role === "LIBRAIRE" ? "LIBRAIRE" : "VISITOR";

    const user = await prisma.user.create({
      data: {
        name: name || email.split("@")[0],
        email,
        password: hashed,
        role: userRole,
        phone: phone || null,
        city: city || null,
      },
    });

    if (userRole === "LIBRAIRE") {
      await prisma.libraire.create({
        data: {
          userId: user.id,
          storeName: storeName || `Librairie de ${user.name}`,
          phone: phone || null,
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'inscription" }, { status: 500 });
  }
}
