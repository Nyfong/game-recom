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

const frameworks = [
  {
    value: "",
    label: "All game",
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
  const [value, setValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle category selection
  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    onFilter?.(newValue, searchQuery); // Pass both category and search query to parent
    setOpen(false);
  };

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    onFilter?.(value, query); // Pass both category and search query to parent
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
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search Category or Game..."
            value={searchQuery}
            onValueChange={handleSearch} // Update search query
          />
          <CommandList>
            <CommandEmpty>No category or game found.</CommandEmpty>
            <CommandGroup>
              {/* Render categories */}
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
            {/* Render filtered games */}
            {games
              .filter(
                (game) =>
                  game.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  (value === "" || game.genre === value)
              )
              .map((game) => (
                <CommandItem
                  key={game._id}
                  value={game.title}
                  onSelect={() => handleSelect(game.genre)}
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
