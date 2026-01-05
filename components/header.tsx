import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SideMenu from "./menu-sheet";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Agende nos melhores com a Aparatus"
          width={100}
          height={24}
        />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="hover:bg-secondary" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SideMenu />
      </Sheet>
    </header>
  );
};
