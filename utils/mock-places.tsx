import {PlaceCardProps} from "../components/shared/place-square-card"

export const MockedPlaces: PlaceCardProps[] = [
    {
        imageUrl: "/images/pendjari.jpg",
        title: "Parc national Pendjari",
        description: "Pendjari est un parc national situé dans le nord-ouest du Bénin.",
        duration: "1 hour",
        type: "Parc",
        pickupAvailable: true,
    },
    {
        imageUrl: "/images/bio-guera-2.jpg",
        title: "Statue Bio Guera",
        description: "Statue Bio Guera est une statue située à Cotonou au Bénin.",
        duration: "2 hours",
        type: "Monument",
        pickupAvailable: false,
    },
    {
        imageUrl: "/images/hills-1.jpg",
        title: "Dassa-Zoumê",
        description: "Dassa-Zoumê est une ville située dans le centre du Bénin.",
        duration: "3 hours",
        type: "Ville",
        pickupAvailable: true,
    },
]