"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectItem {
  value: string;
  label: string;
  searchKey: string;
}

export const SearchableSelect = ({
  items,
  placeholder,
  value,
  onValueChange,
  disabled,
  onSearchChange,
  ariaLabel,
  defaultLabel,
}: {
  items: SelectItem[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
  onSearchChange?: (value: string) => void;
  ariaLabel?: string;
  defaultLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isServerSideSearch = !!onSearchChange;

  const selectedItem = items.find((item) => item.value === value);

  const handleOpenChange = (newOpenState: boolean) => {
    setOpen(newOpenState);
    if (!newOpenState) {
      setSearchValue("");
      if (isServerSideSearch && onSearchChange) {
        onSearchChange("");
      }
    }
  };

  const handleSearchValueChange = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
    if (isServerSideSearch && onSearchChange) {
      // Pas de debounce ici, il est déjà géré dans le parent
      onSearchChange(newSearchValue);
    }
  };

  const itemsToDisplay = isServerSideSearch
    ? items
    : items.filter((item) =>
        item.searchKey.toLowerCase().includes(searchValue.toLowerCase()),
      );

  const showLoading = disabled && isServerSideSearch;
  const showEmpty = !showLoading && itemsToDisplay.length === 0;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className="w-full justify-between py-3 px-2 border border-gray-300 bg-white hover:bg-white"
          disabled={disabled}
        >
          <span className="truncate max-w-[80%]">
            {selectedItem ? selectedItem.label : defaultLabel || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 min-w-[250px] z-50">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder
              .toLowerCase()
              .replace("select ", "")}...`}
            value={searchValue}
            onValueChange={handleSearchValueChange}
          />
          <CommandList className="max-h-[250px] overflow-y-auto">
            {showLoading && (
              <CommandEmpty>
                <div className="flex items-center justify-center py-2">
                  <svg
                    className="w-5 h-5 animate-spin text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span className="ml-2">Loading functions...</span>
                </div>
              </CommandEmpty>
            )}
            {showEmpty && <CommandEmpty>No result found.</CommandEmpty>}

            {!showLoading &&
              itemsToDisplay.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.searchKey.toLowerCase()}
                  onSelect={() => {
                    const newValue = item.value === value ? "" : item.value;
                    onValueChange(newValue);
                    setOpen(false);
                  }}
                  className="w-full text-gray-900 data-[selected]:text-gray-900 text-[13px] cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 text-gray-900",
                      value === item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
