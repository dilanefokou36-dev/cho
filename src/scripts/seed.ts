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
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
