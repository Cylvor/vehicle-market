import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image"; // Theoretically used, but we'll use divs for placeholders as per SVG strategy

interface VehicleSpec {
    id: string;
    name: string;
    price: string;
    image: string;
    specs: {
        [key: string]: string;
    };
}

const COMPARISON_DATA: VehicleSpec[] = [
    {
        id: "1",
        name: "2023 Tesla Model 3 Long Range",
        price: "$58,900",
        image: "/vehicles/tesla-model-3.svg",
        specs: {
            "Body Type": "Sedan",
            "Transmission": "Automatic",
            "Engine": "Electric",
            "Drive Type": "AWD",
            "Fuel Consumption": "14.0 kWh/100km",
            "ANCAP Rating": "5 Stars",
            "Warranty": "4 Years / 80,000km",
        },
    },
    {
        id: "2",
        name: "2023 BMW 3 Series 330i",
        price: "$93,400",
        image: "/vehicles/bmw-m3.svg",
        specs: {
            "Body Type": "Sedan",
            "Transmission": "8 Sp Automatic",
            "Engine": "2.0L Turbo 4cyl",
            "Drive Type": "RWD",
            "Fuel Consumption": "6.4 L/100km",
            "ANCAP Rating": "5 Stars",
            "Warranty": "3 Years / Unlimited km",
        },
    },
    {
        id: "3",
        name: "2023 Mercedes-Benz C-Class C200",
        price: "$89,900",
        image: "/vehicles/mercedes-c-class.svg", // Hypothetical mock
        specs: {
            "Body Type": "Sedan",
            "Transmission": "9 Sp Automatic",
            "Engine": "1.5L Turbo 4cyl Hybrid",
            "Drive Type": "RWD",
            "Fuel Consumption": "6.9 L/100km",
            "ANCAP Rating": "5 Stars",
            "Warranty": "5 Years / Unlimited km",
        },
    }
];

const SPEC_KEYS = [
    "Body Type",
    "Transmission",
    "Engine",
    "Drive Type",
    "Fuel Consumption",
    "ANCAP Rating",
    "Warranty",
];

export function ComparisonTable() {
    return (
        <div className="overflow-x-auto border rounded-md shadow-sm bg-card">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-r bg-muted/30 w-48 min-w-[12rem]">
                            <span className="text-muted-foreground font-medium">Specs</span>
                        </th>
                        {COMPARISON_DATA.map((vehicle) => (
                            <th key={vehicle.id} className="p-4 border-b min-w-[16rem] align-top relative">
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive">
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center text-xs text-muted-foreground">
                                    {/* Placeholder for actual image */}
                                    IMAGE
                                </div>
                                <h3 className="font-bold text-lg leading-tight mb-2 h-12 line-clamp-2">
                                    {vehicle.name}
                                </h3>
                                <p className="text-xl font-bold text-primary mb-4">{vehicle.price}</p>
                                <Button className="w-full">View Details</Button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {SPEC_KEYS.map((key) => (
                        <tr key={key} className="hover:bg-muted/50 transition-colors">
                            <td className="p-4 border-r bg-muted/10 font-medium text-sm text-muted-foreground">
                                {key}
                            </td>
                            {COMPARISON_DATA.map((vehicle) => (
                                <td key={`${vehicle.id}-${key}`} className="p-4 text-sm">
                                    {vehicle.specs[key] || "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
