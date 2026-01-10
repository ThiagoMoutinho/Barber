import { useQuery } from "@tanstack/react-query";

import { queryKey } from "@/constants/query-keys";

import { getDateAvailableTimeSlots } from "@/actions/get-date-available-time-slots";

export const useGetDateAvailableTimeSlots = ({
  barbershopId,
  date,
}: {
  barbershopId: string;
  date: Date;
}) => {
  return useQuery({
    queryKey: queryKey.getAvailableTimeSlot(barbershopId, date),
    queryFn: () =>
      getDateAvailableTimeSlots({
        barbershopId,
        date: date!,
      }),
      enabled: Boolean(date),
  });
};
