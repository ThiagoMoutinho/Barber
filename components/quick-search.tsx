import { PageSectionScroller } from "./ui/page";
import Link from "next/link";
import { Eye, Footprints, ScissorsIcon, Sparkles, User } from "lucide-react";

export const quickSearchOptions = [
  {
    title: "Cabelo",
    icon: <ScissorsIcon className="size-4" />,
  },
  {
    title: "Barba",
    icon: <User className="size-4" />,
  },
  {
    title: "Acabamento",
    icon: <Sparkles className="size-4" />,
  },
  {
    title: "Sobrancelha",
    icon: <Eye className="size-4" />,
  },
  {
    title: "Massagem",
    icon: <Footprints className="size-4" />,
  },
  {
    title: "Hidratação",
    icon: <Sparkles className="size-4" />,
  },
];

const QuickSearch = () => {
  return (
    <PageSectionScroller>
      {quickSearchOptions.map((option) => (
        <Link
          key={option.title}
          href={`/barbershops?search=${option.title}`}
          className="bg-muted flex shrink-0 items-center justify-center gap-3 rounded-3xl border px-4 py-2"
        >
          {option.icon}
          <span className="text-card-foreground text-sm font-medium">
            {option.title}
          </span>
        </Link>
      ))}
    </PageSectionScroller>
  );
};

export default QuickSearch;
