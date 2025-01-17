"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const categories = [
  {
    value: "",
    label: "All games",
  },
  {
    value: "Strategy",
    label: "Strategy",
  },
  {
    value: "Shooter",
    label: "Shooter",
  },
  {
    value: "MMORPG",
    label: "MMORPG",
  },
  {
    value: "Action RPG",
    label: "Action RPG",
  },
  {
    value: "Social",
    label: "Social",
  },
  {
    value: "MOBA",
    label: "MOBA",
  },
  {
    value: "Card Game",
    label: "Card Game",
  },
  {
    value: "ARPG",
    label: "ARPG",
  },
];

function FilterBtn({ games = [], onFilter }) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCategorySelect = (categoryValue) => {
    const newCategory = categoryValue === selectedCategory ? "" : categoryValue;
    setSelectedCategory(newCategory);
    filterGames(newCategory, searchQuery);
    setOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterGames(selectedCategory, query);
  };

  const filterGames = (category, query) => {
    const filteredGames = games.filter((game) => {
      const matchesCategory = category ? game.genre === category : true;
      const matchesSearch = game.title
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    onFilter?.(filteredGames); // Pass filtered games to the parent
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCategory
            ? categories.find((cat) => cat.value === selectedCategory)?.label
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Category or Game..."
            value={searchQuery}
            onValueChange={handleSearch}
          />
          <CommandList>
            <CommandEmpty>No category or game found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={handleCategorySelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {games
              .filter(
                (game) =>
                  game.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  (selectedCategory === "" || game.genre === selectedCategory)
              )
              .map((game) => (
                <CommandItem
                  key={game._id}
                  value={game.title}
                  onSelect={() => handleCategorySelect(game.genre)}
                >
                  {game.title}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default FilterBtn;