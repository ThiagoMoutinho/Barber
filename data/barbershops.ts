import { prisma } from "@/lib/prisma";

export const getBarberShops = async () => {
  const babershops = await prisma.barbershop.findMany();
  return babershops;
};

export const getPopularBarberShops = async () => {
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: 'desc'
    }
  });
  return popularBarbershops;
};

