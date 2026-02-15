import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Gauge, Fuel, Info, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface VehicleInfoProps {
    title: string;
    price: string;
    description: string;
    specs: {
        mileage: string;
        transmission: string;
        fuel: string;
        bodyType: string;
        engine: string;
        color: string;
    };
    features: string[];
}

export function VehicleInfo({ title, price, description, specs, features }: VehicleInfoProps) {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-2xl font-bold text-primary mt-2">{price}</p>
                <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">Dealer Used</Badge>
                    <Badge variant="outline">Warranty Available</Badge>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Year</p>
                        <p className="font-medium">2023</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg">
                    <Gauge className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Mileage</p>
                        <p className="font-medium">{specs.mileage}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg">
                    <Fuel className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Fuel</p>
                        <p className="font-medium">{specs.fuel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg">
                    <Info className="h-5 w-5 text-muted-foreground" />
                    <div className="text-sm">
                        <p className="text-muted-foreground">Trans</p>
                        <p className="font-medium">{specs.transmission}</p>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {description}
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="features">
                    <AccordionTrigger>Features & Options</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specs">
                    <AccordionTrigger>Full Specifications</AccordionTrigger>
                    <AccordionContent>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <dt className="text-muted-foreground">Body Type</dt>
                                <dd className="font-medium">{specs.bodyType}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Engine</dt>
                                <dd className="font-medium">{specs.engine}</dd>
                            </div>
                            <div>
                                <dt className="text-muted-foreground">Color</dt>
                                <dd className="font-medium">{specs.color}</dd>
                            </div>
                        </dl>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
