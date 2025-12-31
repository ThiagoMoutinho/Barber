import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { formatCurrency } from "@/helpers/price";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex h-[90px] items-center gap-3 p-3">
        {/* IMAGE */}
        <div className="relative h-[110px] min-h-[110px] w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex w-full flex-col">
          <h3 className="text-base font-bold">{service.name}</h3>
          <p className="text-400 line-clamp-2 text-sm">{service.description}</p>

          {/* PRICE AND BUTTON */}
          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-bold">
              {formatCurrency(service.priceInCents / 100)}
            </p>

            <Button  className="hover rounded-full px-6 py-2 text-sm font-bold text-white">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
