import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { PageContainer, PageSectionTitle } from "@/components/ui/page";
import BookingItem from "@/components/booking-item";
import { getConfirmedBookings, getFinishedBookings } from "@/data/bookings";
import { isPast } from "date-fns";
import BookingFilters from "./_components/booking-filters";
import BookingPagination from "./_components/booking-pagination";

interface BookingsPageProps {
  searchParams: Promise<{
    filter?: string;
    page?: string;
  }>;
}

const ITEMS_PER_PAGE = 10;

const BookingsPage = async ({ searchParams }: BookingsPageProps) => {
  const { filter, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirect("/");
  }

  // Buscamos em paralelo as duas categorias de agendamentos diretamente no banco
  const [confirmedBookings, finishedBookings] = await Promise.all([
    getConfirmedBookings(session.user.id),
    getFinishedBookings(session.user.id),
  ]);

  let filteredBookings = [...confirmedBookings, ...finishedBookings];

  if (filter === "confirmed") {
    filteredBookings = confirmedBookings;
  } else if (filter === "finished") {
    filteredBookings = finishedBookings.filter((b) => !b.cancelledAt);
  } else if (filter === "cancelled") {
    filteredBookings = finishedBookings.filter((b) => !!b.cancelledAt);
  }

  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Filtramos os paginados para exibição nas seções correspondentes
  const displayConfirmed = paginatedBookings.filter(
    (b) => !isPast(b.date) && !b.cancelledAt,
  );

  const displayFinished = paginatedBookings.filter(
    (b) => isPast(b.date) && !b.cancelledAt,
  );

  const displayCancelled = paginatedBookings.filter((b) => !!b.cancelledAt);

  return (
    <>
      <Header />
      <PageContainer>
        <div className="space-y-6">
          <PageSectionTitle>Agendamentos</PageSectionTitle>

          <BookingFilters />

          {(filter === "all" || !filter || filter === "confirmed") &&
            displayConfirmed.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-muted-foreground text-xs font-bold uppercase">
                  Confirmados
                </h2>
                {displayConfirmed.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            )}

          {(filter === "all" || !filter || filter === "finished") &&
            displayFinished.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-muted-foreground text-xs font-bold uppercase">
                  Finalizados
                </h2>
                {displayFinished.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            )}

          {(filter === "all" || !filter || filter === "cancelled") &&
            displayCancelled.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-muted-foreground text-xs font-bold uppercase">
                  Cancelados
                </h2>
                {displayCancelled.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            )}

          {filteredBookings.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nenhum agendamento encontrado para este filtro.
            </p>
          )}

          <BookingPagination totalPages={totalPages} />
        </div>
      </PageContainer>
    </>
  );
};

export default BookingsPage;
