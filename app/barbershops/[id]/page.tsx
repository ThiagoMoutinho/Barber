import { notFound } from "next/navigation";
import { getBarbershopById } from "@/data/barbershops";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "@/components/ui/service-item";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import PhoneItem from "./_components/phone-item";

interface BarbershopPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <PageContainer>
        <PageSectionContent>
          <PageSectionTitle>Serviços</PageSectionTitle>
          <div className="grid grid-cols-1 gap-4">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                barbershop={barbershop}
              />
            ))}
          </div>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Informações</PageSectionTitle>
          <div className="space-y-3">
            <p className="text-sm">{barbershop.description}</p>
          </div>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Contato</PageSectionTitle>
          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={`${phone}-${index}`} phone={phone} />
            ))}
          </div>
        </PageSectionContent>
      </PageContainer>
    </div>
  );
};

export default BarbershopPage;
