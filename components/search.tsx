import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
  return (
    <div className="flex items-center gap-2">
      <Input className="rounded-full border" placeholder="Buscar barbershop" />
      <Button className="rounded-full h-10 w-10">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
