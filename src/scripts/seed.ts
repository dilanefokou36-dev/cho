import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@bookstore.cm" },
    update: {},
    create: {
      email: "admin@bookstore.cm",
      password,
      name: "Administrateur",
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  const librairePwd = await bcrypt.hash("libraire123", 12);
  const libraire = await prisma.user.upsert({
    where: { email: "libraire@test.cm" },
    update: {},
    create: {
      email: "libraire@test.cm",
      password: librairePwd,
      name: "Libraire Test",
      role: "LIBRAIRE",
      phone: "690000001",
      city: "Yaoundé",
    },
  });

  await prisma.libraire.upsert({
    where: { userId: libraire.id },
    update: {},
    create: {
      userId: libraire.id,
      storeName: "Librairie du Savoir",
      description: "Librairie généraliste spécialisée dans les livres scolaires et la littérature africaine.",
      address: "Rue de l'Indépendance, Yaoundé",
      phone: "690000001",
      status: "APPROVED",
    },
  });

  console.log("Libraire user created:", libraire.email);

  const visitorPwd = await bcrypt.hash("visiteur123", 12);
  const visitor = await prisma.user.upsert({
    where: { email: "visiteur@test.cm" },
    update: {},
    create: {
      email: "visiteur@test.cm",
      password: visitorPwd,
      name: "Visiteur Test",
      role: "VISITOR",
    },
  });

  console.log("Visitor user created:", visitor.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
