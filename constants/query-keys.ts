export const queryKey = {
  getAvailableTimeSlot: (barbershopId: string, date: Date) => [
    "available-time-lots",
    barbershopId,
    date?.toISOString(),
  ],
};
