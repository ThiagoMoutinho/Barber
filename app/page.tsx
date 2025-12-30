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

export default async function Home() {
  const barbershops = await getBarberShops();
  const popularBarbershops = await getPopularBarberShops();
  
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
        <PageSectionContent>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem
            name="Thiago"
            date="2023-12-12"
            month="dezembro"
            day="12"
          />
        </PageSectionContent>
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
