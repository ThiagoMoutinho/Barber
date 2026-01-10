"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { format } from "date-fns";
import { z } from "zod";
import { headers } from "next/headers.js";

const inputSchema = z.object({
  barbershopId: z.string(),
  date: z.date(),
});

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
];

export const getDateAvailableTimeSlots = actionClient
  .schema(inputSchema)
  .action(async ({ parsedInput: { barbershopId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Não autorizado. Faça login para continuar."],
      });
    }
    const bookings = await prisma.booking.findMany({
      where: {
        barbershopId,
        ...date,
      },
    });

    const acuupiedSlots = bookings.map(
        (booking) => format(booking.date, "HH:mm"),
    );
    const availbleTimeSlots = TIME_SLOTS.filter(
        (slot) => !acuupiedSlots.includes(slot),
    )
    return availbleTimeSlots;
  });
