//lib/prisma.ts

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const globalFormPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalFormPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalFormPrisma.prisma = prisma;
}
