import { useState, useEffect } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "vehicle_compare_list";
export const Math_MAX_COMPARE = 3;

export function useCompare() {
    const [compareItems, setCompareItems] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setCompareItems(JSON.parse(stored));
            } catch (error) {
                console.error("Failed to parse compare items:", error);
            }
        }
    }, []);

    const addVehicle = (id: string) => {
        setCompareItems((prev) => {
            if (prev.includes(id)) {
                toast.error("Vehicle already in compare list");
                return prev;
            }
            if (prev.length >= Math_MAX_COMPARE) {
                toast.error(`You can only compare up to ${Math_MAX_COMPARE} vehicles at a time`);
                return prev;
            }
            const newList = [...prev, id];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            toast.success("Added to compare list");
            return newList;
        });
    };

    const removeVehicle = (id: string) => {
        setCompareItems((prev) => {
            const newList = prev.filter((item) => item !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
            return newList;
        });
    };

    const clearVehicles = () => {
        setCompareItems([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        compareItems,
        addVehicle,
        removeVehicle,
        clearVehicles,
        isMounted,
        canAdd: compareItems.length < Math_MAX_COMPARE,
    };
}
