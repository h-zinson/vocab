import { Search } from "lucide-react";
import { Input } from "../ui/input";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
}

export default SearchBar;
