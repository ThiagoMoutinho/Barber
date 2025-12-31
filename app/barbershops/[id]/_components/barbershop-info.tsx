"use client";

import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="outline"
          className="hover:bg-secondary absolute top-4 left-4 z-50 h-8 w-8"
          onClick={handleBackClick}
        >
          <ChevronLeftIcon size={16} />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="hover:bg-secondary absolute top-4 right-4 z-50 h-8 w-8"
        >
          <MenuIcon size={16} />
        </Button>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover opacity-85"
        />
      </div>

      <div className="border-secondary bg-background relative -mt-6 rounded-t-3xl border-b border-solid px-5 py-3 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{barbershop.name}</h1>
          <Avatar className="border-primary h-12 w-12 border-2">
            <AvatarImage src={barbershop.imageUrl} className="object-cover" />
          </Avatar>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="mt-2 flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
