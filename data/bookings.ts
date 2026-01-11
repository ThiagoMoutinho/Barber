import { prisma } from "@/lib/prisma";

export const getBookingsByUserId = async (
  userId: string,
  skip?: number,
  take?: number,
) => {
  return await prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: "asc",
    },
    skip,
    take,
  });
};

export const getBookingsCountByUserId = async (userId: string) => {
  return await prisma.booking.count({
    where: {
      userId,
    },
  });
};

export const getConfirmedBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: {
      userId,
      date: {
        gte: new Date(),
      },
      cancelledAt: null,
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};

export const getFinishedBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: {
      userId,
      OR: [
        {
          date: {
            lt: new Date(),
          },
        },
        {
          cancelledAt: {
            not: null,
          },
        },
      ],
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};
