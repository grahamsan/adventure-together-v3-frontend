"use client";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
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
import { usePlacesControllerFindAll } from "@/api/places/hooks";
import { cn } from "@/lib/utils";

const FALLBACK_IMG = "/images/hills-1.jpg";

export type PlaceOption = {
  id: string;
  title: string;
  imageUrl?: string | null;
};

type PlaceComboboxProps = {
  value: string;
  onValueChange: (placeId: string) => void;
  /** Appelé avec le lieu complet à la sélection, ou `null` si « Aucun lieu ». */
  onPlaceSelect?: (place: PlaceOption | null) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function PlaceCombobox({
  value,
  onValueChange,
  onPlaceSelect,
  disabled,
  placeholder = "Rechercher un lieu…",
}: PlaceComboboxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading } = usePlacesControllerFindAll();
  const places: PlaceOption[] = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.map((p: PlaceOption) => ({
      id: p.id,
      title: p.title,
      imageUrl: p.imageUrl,
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return places;
    return places.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q),
    );
  }, [places, search]);

  const selected = places.find((p) => p.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled || isLoading}
          className="h-auto min-h-11 w-full justify-between px-3 py-2 text-left font-normal"
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            {selected ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.imageUrl?.trim() || FALLBACK_IMG}
                  alt=""
                  className="size-9 shrink-0 rounded-md object-cover"
                />
                <span className="truncate text-sm font-medium">
                  {selected.title}
                </span>
              </>
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="size-4 shrink-0 opacity-70" />
                <span className="truncate">Aucun lieu lié</span>
              </span>
            )}
          </span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Chargement…" : "Aucun lieu trouvé."}
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="__none__"
                onSelect={() => {
                  onValueChange("");
                  onPlaceSelect?.(null);
                  setOpen(false);
                  setSearch("");
                }}
                className="gap-2"
              >
                <Check
                  className={cn(
                    "size-4 shrink-0",
                    !value ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="text-muted-foreground">Aucun lieu</span>
              </CommandItem>
              {filtered.map((place) => (
                <CommandItem
                  key={place.id}
                  value={place.id}
                  onSelect={() => {
                    onValueChange(place.id);
                    onPlaceSelect?.(place);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="gap-2"
                >
                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      value === place.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={place.imageUrl?.trim() || FALLBACK_IMG}
                    alt=""
                    className="size-9 shrink-0 rounded-md object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate">{place.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
