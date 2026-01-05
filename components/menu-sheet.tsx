"use client";

import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { quickSearchOptions } from "./quick-search";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SideMenu = () => {
  const { data: session, isPending } = authClient.useSession();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoginLoading(true);
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error("Erro ao fazer login com Google");
      console.error(error);
    } finally {
      // O redirecionamento acontece antes de chegar aqui no sucesso
      // mas mantemos o loading caso algo falhe silenciosamente
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Deslogado com sucesso!");
  };

  return (
    <SheetContent className="overflow-y-auto p-0">
      <SheetHeader className="border-secondary border-b border-solid p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex flex-col gap-3 px-5 py-6">
        {isPending ? (
          <div className="flex items-center justify-center p-5">
            <Loader2 className="animate-spin" />
          </div>
        ) : session ? (
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              )}
              {!session.user.image && (
                <AvatarFallback>
                  {session.user.name?.split(" ")[0][0]}
                  {session.user.name?.split(" ").pop()?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <p className="text-base font-bold">{session.user.name}</p>
              <p className="text-muted-foreground text-xs">
                {session.user.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 sm:flex-row">
            <p className="text-base font-bold">Olá, faça seu login!</p>
            <Button
              onClick={handleLogin}
              disabled={isLoginLoading}
              className="justify-start gap-2 rounded-full px-6 py-2 text-sm font-bold"
            >
              <>
                {isLoginLoading && <Loader2 className="animate-spin" />}
                Login
                <LogInIcon size={18} />
              </>
            </Button>
          </div>
        )}
      </div>

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
        {session && (
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-muted-foreground justify-start gap-3 px-0"
          >
            <LogOutIcon size={18} />
            Sair da conta
          </Button>
        )}
      </div>
    </SheetContent>
  );
};

export default SideMenu;
