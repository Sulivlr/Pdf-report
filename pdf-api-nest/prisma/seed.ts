import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.file.deleteMany();

  await prisma.folder.deleteMany();

  await prisma.folder.createMany({
    data: [{ name: "Документы" }, { name: "Отчеты" }],
  });
}

void main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
