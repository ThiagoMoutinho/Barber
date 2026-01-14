import { Barbershop, BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/helpers/price";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "priceInCents">;
  barbershop: Pick<Barbershop, "name">;
  date: Date;
}

const BookingSummary = ({ service, barbershop, date }: BookingSummaryProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {formatCurrency(Number(service.priceInCents) / 100)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground text-sm">Data</h3>
          <p className="text-sm">
            {format(date, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground text-sm">Horário</h3>
          <p className="text-sm">{format(date, "HH:mm", { locale: ptBR })}</p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-muted-foreground text-sm">Barbearia</h3>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
