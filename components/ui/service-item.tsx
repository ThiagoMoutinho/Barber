"use client";

/* eslint-disable simple-import-sort/imports */
import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./button";
import { formatCurrency } from "@/helpers/price";
import { Sheet, SheetTrigger } from "./sheet";
import { useState } from "react";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createBooking } from "@/actions/create-booking";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "./card";
import dayjs from "dayjs";
import { useGetDateAvailableTimeSlots } from "@/hooks/data/use-get-date-available-time-slot.tsx";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const { executeAsync: executeCreateBooking, isPending } = useAction(
    createBooking,
    {
      onSuccess: () => {
        toast.success("Reserva realizada com sucesso!");
      },
      onError: () => {
        return;
      },
    },
  );

  const { data: availableTimeSlots, isPending: isLoadingAvailableTimeSlots } =
    useGetDateAvailableTimeSlots({
      barbershopId: barbershop.id,
      date: selectedDate!,
    });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Por favor, selecione uma data e um horário.");
      return;
    }
    const splitTime = selectedTime.split(":");
    const hours = parseInt(splitTime[0]);
    const minutes = parseInt(splitTime[1]);
    const date = new Date(selectedDate || new Date());
    date.setHours(hours, minutes, 0, 0);

    const result = await executeCreateBooking({
      date: date.toISOString(),
      serviceId: service.id,
      barbershopId: barbershop.id,
    });
    if (result?.validationErrors) {
      toast.error(result.validationErrors._errors?.[0]);
    }
    if (result?.serverError) {
      return toast.error("Erro ao realizar reserva. Faça login e tente novamente.");
    }
    setSheetIsOpen(false);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-solid p-3">
      {/* IMAGE */}
      <div className="relative h-[110px] w-[110px] shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-bold">{service.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {service.description}
        </p>

        {/* PRICE AND BUTTON */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-primary text-sm font-bold">
            {formatCurrency(service.priceInCents / 100)}
          </p>

          <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full">Reservar</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto p-0">
              <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
                <SheetTitle>Fazer Reserva</SheetTitle>
              </SheetHeader>

              <div className="py-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ before: new Date() }}
                  locale={ptBR}
                  className="w-full"
                />
              </div>

              {/* Exibir horários apenas se a data estiver selecionada */}
              {selectedDate && (
                <div className="border-secondary flex gap-3 overflow-x-auto border-y border-solid px-5 py-6 [&::-webkit-scrollbar]:hidden">
                  {availableTimeSlots?.data
                    ?.filter((time) => {
                      if (!isToday(selectedDate)) return true;
                      const [hour, minutes] = time.split(":").map(Number);
                      return dayjs()
                        .set("hour", hour)
                        .set("minute", minutes)
                        .isAfter(dayjs());
                    })
                    .map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                </div>
              )}

              {/* Card de Resumo */}
              {selectedDate && selectedTime && (
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
                          {format(selectedDate, "dd 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h3 className="text-muted-foreground text-sm">
                          Horário
                        </h3>
                        <p className="text-sm">{selectedTime}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h3 className="text-muted-foreground text-sm">
                          Barbearia
                        </h3>
                        <p className="text-sm">{barbershop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-auto p-5">
                <Button
                  className="w-full rounded-full font-bold"
                  disabled={!selectedDate || !selectedTime || isPending}
                  onClick={handleConfirmBooking}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isPending ? null : "Confirmar reserva"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
