"use client";

import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useState, useMemo } from "react";
import { Barbershop, BarbershopService } from "@prisma/client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatCurrency } from "@/helpers/price";
import { createBooking } from "@/actions/create-booking";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface BookingSheetProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const TIME_LIST = [
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

const BookingSheet = ({ service, barbershop }: BookingSheetProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);
  const router = useRouter();

  const { execute, isPending } = useAction(createBooking, {
    onSuccess: () => {
      toast.success("Reserva realizada com sucesso!");
      router.push("/bookings");
    },
    onError: () => {
      toast.error("Erro ao realizar reserva. Tente novamente.");
    },
  });

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingSubmit = async () => {
    if (!date || !hour) return;

    const [hours, minutes] = hour.split(":").map(Number);
    const newDate = setMinutes(setHours(date, hours), minutes);

    execute({
      serviceId: service.id,
      date: newDate,
    });
  };

  return (
    <SheetContent className="overflow-y-auto p-0">
      <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
        <SheetTitle>Fazer Reserva</SheetTitle>
      </SheetHeader>

      <div className="py-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          locale={ptBR}
          className="w-full"
          fromDate={new Date()}
        />
      </div>

      {/* Exibir horários apenas se a data estiver selecionada */}
      {date && (
        <div className="border-secondary flex gap-3 overflow-x-auto border-y border-solid px-5 py-6 [&::-webkit-scrollbar]:hidden">
          {TIME_LIST.map((time) => (
            <Button
              key={time}
              variant={hour === time ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleHourClick(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      )}

      {/* Card de Resumo */}
      {date && hour && (
        <div className="p-5">
          <Card>
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm font-bold">
                  {formatCurrency(service.priceInCents / 100)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-muted-foreground text-sm">Data</h3>
                <p className="text-sm">
                  {format(date, "dd 'de' MMMM", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-muted-foreground text-sm">Horário</h3>
                <p className="text-sm">{hour}</p>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-muted-foreground text-sm">Barbearia</h3>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-auto p-5">
        <Button
          className="w-full rounded-full font-bold"
          disabled={!date || !hour || isPending}
          onClick={handleBookingSubmit}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirmar reserva
        </Button>
      </div>
    </SheetContent>
  );
};

export default BookingSheet;
