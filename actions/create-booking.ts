"use server";

import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isPast } from "date-fns";

const createBookingSchema = z.object({
  serviceId: z.string(),
  barbershopId: z.string(),
  date: z.date(),
});

export const createBooking = actionClient
  .schema(createBookingSchema)
  .action(async ({ parsedInput: { serviceId, barbershopId, date } }) => {
    if(isPast(date)) {
      throw new Error("Não é possível agendar para uma data passada.");
    }
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    // usuário autenticado?
    if (!session?.user) {
      throw new Error("Usuário não autenticado. Por favor, faça login.");
    }

    // Zerar segundos e milissegundos para garantir comparação exata
    date.setSeconds(0);
    date.setMilliseconds(0);

    // já tem agendamento para esse horário?
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId,
        date,
      },
    });
    if (existingBooking) {
      throw new Error("Data e hora selecionada já está agendada. Tente outro horário.");
    }

    const booking = await prisma.booking.create({
      data: {
        serviceId,
        userId: session.user.id,
        barbershopId,
        date,
      },
    });
    

    return booking;
  });
