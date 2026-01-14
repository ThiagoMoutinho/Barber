"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isPast } from "date-fns";
import { protectionActionClient } from "@/lib/action-client";
import { revalidatePath } from "next/cache";

const createBookingSchema = z.object({
  serviceId: z.string(),
  barbershopId: z.string(),
  date: z.string(),
});

export const createBooking = protectionActionClient
  .schema(createBookingSchema)
  .action(
    async ({
      parsedInput: { serviceId, barbershopId, date },
      ctx: { user },
    }) => {
      const bookingDate = new Date(date);

      if (isPast(bookingDate)) {
        throw new Error("Não é possível agendar para uma data passada.");
      }

      // Zerar segundos e milissegundos para garantir comparação exata
      bookingDate.setSeconds(0);
      bookingDate.setMilliseconds(0);

      // já tem agendamento para esse horário?
      const existingBooking = await prisma.booking.findFirst({
        where: {
          barbershopId,
          date: bookingDate,
        },
      });
      if (existingBooking) {
        throw new Error(
          "Data e hora selecionada já está agendada. Tente outro horário.",
        );
      }

      const booking = await prisma.booking.create({
        data: {
          serviceId,
          userId: user.id,
          barbershopId,
          date: bookingDate,
        },
      });

      revalidatePath("/");
      revalidatePath("/bookings");

      return booking;
    },
  );
