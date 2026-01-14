"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { differenceInHours } from "date-fns";
import { protectionActionClient } from "@/lib/action-client";
import { revalidatePath } from "next/cache";

const cancelBookingSchema = z.object({
  bookingId: z.string(),
});

export const cancelBooking = protectionActionClient
  .schema(cancelBookingSchema)
  .action(async ({ parsedInput: { bookingId }, ctx: { user } }) => {
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new Error("Reserva não encontrada.");
    }

    if (booking.userId !== user.id) {
      throw new Error("Você não tem permissão para cancelar esta reserva.");
    }

    const diff = differenceInHours(new Date(booking.date), new Date());

    if (diff < 1) {
      throw new Error(
        "Você só pode cancelar uma reserva com pelo menos 1 hora de antecedência.",
      );
    }

    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        cancelledAt: new Date(),
      },
    });

    revalidatePath("/bookings");
    revalidatePath("/");

    return { success: true };
  });
