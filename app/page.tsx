import { Header } from "@/components/header";
import Image from "next/image";
import banner from "@/public/banner.png";
import { getBarberShops, getPopularBarberShops } from "@/data/barbershops";
import BarberShopItem from "@/components/barbershop-item";
import {
  PageContainer,
  PageSectionContent,
  PageSectionScroller,
  PageSectionTitle,
} from "@/components/ui/page";
import BookingItem from "@/components/booking-item";
import QuickSearch from "@/components/quick-search";
import Search from "@/components/search";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getBookingsByUserId } from "@/data/bookings";
import { getBookingStatus } from "@/lib/get-booking-status";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const barbershops = await getBarberShops();
  const popularBarbershops = await getPopularBarberShops();
  const bookings = session?.user
    ? await getBookingsByUserId(session.user.id)
    : [];

  const sortedBookings = [...bookings].sort((a, b) => {
    const statusA = getBookingStatus(new Date(a.date), a.cancelledAt);
    const statusB = getBookingStatus(new Date(b.date), b.cancelledAt);

    if (statusA === "CONFIRMED" && statusB !== "CONFIRMED") return -1;
    if (statusA !== "CONFIRMED" && statusB === "CONFIRMED") return 1;
    return 0;
  });

  return (
    <div>
      <Header />
      <PageContainer>
        <Search />
        <QuickSearch />
        <Image
          src={banner}
          alt="Agende nos melhores com Aparatus"
          sizes="100vw"
          className="h-auto w-full"
        />
        {sortedBookings.length > 0 && (
          <PageSectionContent>
            <PageSectionTitle>Agendamentos</PageSectionTitle>
            <PageSectionScroller>
              {sortedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </PageSectionScroller>
          </PageSectionContent>
        )}
        <PageSectionContent>
          <PageSectionTitle>Nossas barbershops</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
        <PageSectionContent>
          <PageSectionTitle>Barbearia Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageContainer>
    </div>
  );
}
