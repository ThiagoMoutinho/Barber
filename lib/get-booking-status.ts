import { isPast } from "date-fns";

export type BookingStatus = "CONFIRMED" | "FINISHED" | "CANCELLED";

export const getBookingStatus = (date: Date, cancelledAt: Date | null): BookingStatus => {
  if (cancelledAt) {
    return "CANCELLED";
  }

  if (isPast(date)) {
    return "FINISHED";
  }

  return "CONFIRMED";
};
