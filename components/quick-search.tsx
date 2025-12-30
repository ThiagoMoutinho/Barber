import { PageSectionScroller } from "./ui/page";
import Link from "next/link";
import { Eye, Footprints, ScissorsIcon, Sparkles, User } from "lucide-react";

const QuickSearch = () => {
  return (
    <PageSectionScroller>
      <Link
        href="/barbeshop?search=cabelo"
        className="border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <ScissorsIcon className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
            Cabelo
          </span>
      </Link>
      <Link
        href="/barbeshop?search=cabelo"
        className="border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <User className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
            Barba
          </span>
      </Link>
      <Link
        href="/barbeshop?search=acabamento"
        className="border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Sparkles className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
            Acabamento
          </span>
      </Link>
      <Link
        href="/barbeshop?search=sobrancelha"
        className="border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Eye className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
            Sobrancelha
          </span>
      </Link>
      <Link
        href="/barbeshop?search=pezinho"
        className="border bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl px-4 py-2"
      >
        <Footprints className="size-4" />
        <span className="text-card-foreground text-sm font-medium">
            Pézinho
          </span>
      </Link>
    </PageSectionScroller>
  );
};

export default QuickSearch;
