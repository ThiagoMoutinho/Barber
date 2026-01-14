"use client";

import { Prisma } from "@prisma/client";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import BookingSummary from "./booking-summary";
import PhoneItem from "@/app/barbershops/[id]/_components/phone-item";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useAction } from "next-safe-action/hooks";
import { cancelBooking } from "@/actions/cancel-booking";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getBookingStatus } from "@/lib/get-booking-status";
import { Card, CardContent } from "./ui/card";

interface BookingDetailsSheetProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingDetailsSheet = ({ booking }: BookingDetailsSheetProps) => {
  const bookingDate = new Date(booking.date);
  const status = getBookingStatus(bookingDate, booking.cancelledAt);
  const isConfirmed = status === "CONFIRMED";
  const isCancelled = status === "CANCELLED";

  const { executeAsync: executeCancelBooking, isPending } = useAction(
    cancelBooking,
    {
      onError: (error) => {
        if (error.error.serverError) {
          toast.error(
            "A reserva só pode ser cancelada até 1 hora antes do horário.",
          );
        }
      },
    },
  );

  const handleCancelBooking = async () => {
    const result = await executeCancelBooking({
      bookingId: booking.id,
    });

    if (result?.data?.success) {
      toast.success("Reserva cancelada com sucesso!");
    }
  };

  return (
    <SheetContent className="w-[85%] p-0 sm:max-w-[450px]">
      <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
        <SheetTitle>Informações da Reserva</SheetTitle>
      </SheetHeader>

      <div className="flex h-[calc(100vh-80px)] flex-col justify-between">
        <div className="overflow-y-auto p-5">
          <div className="relative h-[180px] w-full">
            <Image
              src="/map.png"
              alt="Mapa da barbearia"
              fill
              className="rounded-xl object-cover"
            />

            <Card className="absolute bottom-3 left-0 w-full border-none bg-transparent px-5">
              <CardContent className="bg-card flex items-center gap-3 rounded-xl border border-solid p-3 shadow-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <h3 className="truncate font-bold">
                    {booking.barbershop.name}
                  </h3>
                  <p className="text-muted-foreground truncate text-xs">
                    {booking.barbershop.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex flex-col gap-3">
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

            <BookingSummary
              barbershop={booking.barbershop}
              service={booking.service}
              date={bookingDate}
            />

            <div className="mt-6 flex flex-col gap-3">
              {booking.barbershop.phones.map((phone, index) => (
                <PhoneItem key={`phone-${index}`} phone={phone} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 p-5">
          <SheetClose asChild>
            <Button variant="outline" className="w-[46%] rounded-full">
              Voltar
            </Button>
          </SheetClose>

          {isConfirmed && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-[50%] rounded-full"
                  disabled={isPending}
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%] rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Você deseja cancelar sua reserva?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Ao cancelar, você perderá sua vaga e não poderá reverter
                    esta ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col gap-3">
                  <AlertDialogAction asChild>
                    <Button
                      className="bg-destructive hover:bg-destructive/90 w-full rounded-full text-white"
                      onClick={handleCancelBooking}
                      disabled={isPending}
                    >
                      {isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </AlertDialogAction>
                  <AlertDialogCancel asChild>
                    <Button variant="secondary" className="w-full rounded-full">
                      Voltar
                    </Button>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default BookingDetailsSheet;
