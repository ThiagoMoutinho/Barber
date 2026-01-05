"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const createBookingSchema = z.object({
  serviceId: z.string(),
  date: z.date(),
});

export const createBooking = actionClient
  .schema(createBookingSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
      throw new Error("Usuário não autenticado");
    }

    const userId = session.user.id;

    await prisma.booking.create({
      data: {
        serviceId,
        userId,
        date,
      },
    });

    revalidatePath("/");
    revalidatePath("/bookings");
  });
