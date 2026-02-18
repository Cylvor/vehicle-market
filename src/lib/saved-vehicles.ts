export const SAVED_VEHICLES_STORAGE_KEY = "saved-vehicles";

export type SavedVehicle = {
    id: string;
    title: string;
    price: string;
    image: string;
    mileage: string;
    fuel: string;
    year: string;
    transmission: string;
};

function isSavedVehicleArray(value: unknown): value is SavedVehicle[] {
    return Array.isArray(value);
}

export function getSavedVehicles(): SavedVehicle[] {
    if (typeof window === "undefined") return [];

    const raw = window.localStorage.getItem(SAVED_VEHICLES_STORAGE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw) as unknown;
        if (!isSavedVehicleArray(parsed)) return [];
        return parsed;
    } catch {
        return [];
    }
}

export function setSavedVehicles(vehicles: SavedVehicle[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SAVED_VEHICLES_STORAGE_KEY, JSON.stringify(vehicles));
}

export function isVehicleSaved(id: string) {
    return getSavedVehicles().some((vehicle) => vehicle.id === id);
}

export function toggleVehicleSaved(vehicle: SavedVehicle) {
    const savedVehicles = getSavedVehicles();
    const exists = savedVehicles.some((savedVehicle) => savedVehicle.id === vehicle.id);

    const updated = exists
        ? savedVehicles.filter((savedVehicle) => savedVehicle.id !== vehicle.id)
        : [...savedVehicles, vehicle];

    setSavedVehicles(updated);
    return {
        isSaved: !exists,
        savedVehicles: updated,
    };
}
