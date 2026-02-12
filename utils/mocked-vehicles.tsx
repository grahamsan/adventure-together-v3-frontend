import { Vehicle } from "@/api/vehicles/types";

export const mockedVehicles: Vehicle[] = [
    {
        id: "veh1",
        brand: "Toyota",
        model: "Camry",
        plateNumber: "ABC123",
        seats: 4,
        imageUrl:
            "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: "veh2",
        brand: "Ford",
        model: "Transit",
        plateNumber: "DEF456",
        seats: 8,
        imageUrl:
            "https://images.unsplash.com/photo-1542365887-1b7b6d9b3f6d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: "veh3",
        brand: "Renault",
        model: "Kangoo",
        plateNumber: "GHI789",
        seats: 5,
        imageUrl:
            "https://images.unsplash.com/photo-1512069772990-87124e3c9b2b?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];