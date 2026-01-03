"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { quickSearchOptions } from "./quick-search";

const SideMenu = () => {
  // TODO: Implement authentication logic
  const isAuthenticated = false; // Mocked for now to match figma image

  return (
    <SheetContent className="overflow-y-auto p-0">
      <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {isAuthenticated ? (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <p className="font-bold">Thiago</p>
              <p className="text-muted-foreground text-xs">
                thiago@example.com
              </p>
            </div>
          </div>

          <Button variant="secondary" className="justify-start gap-2" asChild>
            <Link href="/profile">
              <UserIcon size={18} />
              Perfil
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row">
          <p className="text-base font-bold">Olá, faça seu login!</p>
          <Button className="justify-start gap-2 rounded-full px-6 py-2 text-sm font-bold">
            Login
            <LogInIcon size={18} />
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5 py-2">
        <Button variant="ghost" className="justify-start gap-3 px-0" asChild>
          <Link href="/">
            <HomeIcon size={18} />
            Início
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-3 px-0" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      <div className="border-secondary flex flex-col gap-3 border-t border-solid px-5 py-6">
        <div className="flex flex-col gap-3">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant="ghost"
              className="justify-start gap-3 px-0"
              asChild
            >
              <Link href={`/barbershops?search=${option.title}`}>
                {option.icon}
                <span className="text-foreground text-sm font-normal">
                  {option.title}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="border-secondary flex flex-col gap-3 border-t border-solid px-5 py-6">
        <Button
          variant="ghost"
          className="text-muted-foreground justify-start gap-3 px-0"
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  );
};

export default SideMenu;
