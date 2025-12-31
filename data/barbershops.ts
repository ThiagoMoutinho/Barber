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

export const getBarbershopById = async (id: string) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  return barbershop;
};

