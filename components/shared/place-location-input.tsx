"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { usePlacesControllerFindAll } from "@/api/places/hooks";
import { cn } from "@/lib/utils";

type PlaceLocationInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
};

/**
 * Saisie libre + liste des lieux plateforme filtrée sous le champ (comme le flux lieu de création d’événement).
 */
export default function PlaceLocationInput({
  value,
  onChange,
  placeholder = "Ville, adresse…",
  disabled,
  id,
  className,
  "aria-invalid": ariaInvalid,
}: PlaceLocationInputProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = usePlacesControllerFindAll();

  const places = useMemo(() => {
    if (!Array.isArray(data)) return [] as { id: string; title: string }[];
    return data.map((p: { id: string; title: string }) => ({
      id: p.id,
      title: p.title,
    }));
  }, [data]);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return places.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 12);
  }, [places, value]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showList = open && !disabled && filtered.length > 0;

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <Input
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-invalid={ariaInvalid}
        className="pr-9"
      />
      <MapPin className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground opacity-60" />

      {showList && (
        <ul
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md"
          role="listbox"
        >
          {isLoading ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              Chargement…
            </li>
          ) : (
            filtered.map((place) => (
              <li key={place.id} role="option">
                <button
                  type="button"
                  className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(place.title);
                    setOpen(false);
                  }}
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <span>{place.title}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
