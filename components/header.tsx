import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex items-center justify-between bg-background px-5 py-6">
      <Image src="/logo.svg" alt="Agende nos melhores com a Aparatus" width={100} height={24} />
      <Button variant="outline" className="hover:bg-secondary" size="icon">
        <MenuIcon />
      </Button>
    </header>
  );
};
