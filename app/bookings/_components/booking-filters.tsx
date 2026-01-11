"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const BookingFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const handleFilterClick = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    params.set("page", "1"); // Reseta para a primeira página ao filtrar
    router.push(`/bookings?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <Button
        variant={currentFilter === "all" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => handleFilterClick("all")}
      >
        Todos
      </Button>
      <Button
        variant={currentFilter === "confirmed" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => handleFilterClick("confirmed")}
      >
        Confirmados
      </Button>
      <Button
        variant={currentFilter === "finished" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => handleFilterClick("finished")}
      >
        Finalizados
      </Button>
      <Button
        variant={currentFilter === "cancelled" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={() => handleFilterClick("cancelled")}
      >
        Cancelados
      </Button>
    </div>
  );
};

export default BookingFilters;
