import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";

const BookingItem = ({
  name,
  date,
  month,
  day,
}: {
  name: string;
  date: string;
  month: string;
  day: string;
}) => {
  return (
    <Card>
      <CardContent className="flex h-full cursor-pointer items-center justify-between p-0">
        {/* ESQUERDA */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Badge className="text-xs font-bold uppercase">confirmado</Badge>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Corte de Cabelo</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                  alt="Aparatus"
                />
              </Avatar>
              <p className="text-sm font-medium text-gray-600">
                Barbearia do João
              </p>
            </div>
          </div>
        </div>
        {/* DIREITA */}
        <div className="flex h-full w-[106px] flex-col items-center justify-center border-l py-3">
          <p className="text-1xl capitalize">{month}</p>
          <p className="text-2xl">{day}</p>
          <p className="text-sm font-medium">{date}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
