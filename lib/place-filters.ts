import type { CreatePlaceDto } from "@/api/places/types";

/** Filtre affiché dans la bannière ; mappe vers `PlaceType` API. */
export type PlacesCategoryFilter =
  | "all"
  | CreatePlaceDto["type"]
  | "restaurants";

const RESTAURANTS_API_TYPE: CreatePlaceDto["type"] = "Hotel";

export function placesFilterToQuery(
  filter: PlacesCategoryFilter,
): { type?: CreatePlaceDto["type"] } {
  if (filter === "all") return {};
  if (filter === "restaurants") return { type: RESTAURANTS_API_TYPE };
  return { type: filter };
}

/** Libellés chips (ordre maquette). */
export const PLACES_FILTER_CHIPS: {
  id: PlacesCategoryFilter;
  label: string;
}[] = [
  { id: "all", label: "Tout voir" },
  { id: "Ville", label: "Villes" },
  { id: "Monument", label: "Monuments" },
  { id: "Musée", label: "Musées" },
  { id: "restaurants", label: "Restaurants" },
  { id: "Parc", label: "Centres de loisirs" },
];
