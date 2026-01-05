/* eslint-disable simple-import-sort/imports */
import { Barbershop, BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./button";
import { formatCurrency } from "@/helpers/price";
import { Sheet, SheetTrigger } from "./sheet";
import BookingSheet from "../booking-sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
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

          <Sheet>
            <SheetTrigger>
              <div className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-8 items-center justify-center rounded-full px-5 text-sm font-bold transition-all">
                Reservar
              </div>
            </SheetTrigger>
            <BookingSheet service={service} barbershop={barbershop} />
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
