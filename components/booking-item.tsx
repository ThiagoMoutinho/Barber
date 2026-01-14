"use client";

import { Prisma } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { format, isPast, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getBookingStatus } from "@/lib/get-booking-status";
import { Sheet, SheetTrigger } from "./ui/sheet";
import BookingDetailsSheet from "./booking-details-sheet";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const bookingDate = new Date(booking.date);
  const status = getBookingStatus(bookingDate, booking.cancelledAt);

  const isConfirmed = status === "CONFIRMED";
  const isCancelled = status === "CANCELLED";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[90%]">
          <CardContent className="flex h-full cursor-pointer items-center justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-[3] flex-col gap-3 p-5">
              <Badge
                variant={
                  isCancelled
                    ? "destructive"
                    : isConfirmed
                      ? "default"
                      : "secondary"
                }
                className="w-fit"
              >
                {isCancelled
                  ? "Cancelado"
                  : isConfirmed
                    ? "Confirmado"
                    : "Finalizado"}
              </Badge>

              <div className="flex flex-col gap-2">
                <p className="font-bold">{booking.service.name}</p>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={booking.barbershop.imageUrl}
                      alt={booking.barbershop.name}
                    />
                  </Avatar>
                  <p className="text-sm font-medium text-gray-600">
                    {booking.barbershop.name}
                  </p>
                </div>
                {isConfirmed && (
                  <p className="text-muted-foreground text-xs">
                    Em{" "}
                    {formatDistanceToNow(bookingDate, {
                      locale: ptBR,
                      addSuffix: false,
                    })}
                  </p>
                )}
              </div>
            </div>

            {/* DIREITA */}
            <div className="border-secondary flex flex-1 flex-col items-center justify-center border-l border-solid px-5 py-3">
              <p className="text-sm capitalize">
                {format(bookingDate, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(bookingDate, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(bookingDate, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <BookingDetailsSheet booking={booking} />
    </Sheet>
  );
};

export default BookingItem;
