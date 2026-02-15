"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FilterSidebar() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-foreground">
                    Reset All
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={["make", "price", "body"]} className="w-full">
                {/* Make & Model */}
                <AccordionItem value="make">
                    <AccordionTrigger>Make & Model</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <Input placeholder="Search makes..." className="mb-2" />
                            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                {["Toyota", "Mazda", "Ford", "Hyundai", "Mitsubishi", "Kia", "Tesla", "BMW", "Mercedes-Benz"].map((make) => (
                                    <div key={make} className="flex items-center space-x-2">
                                        <Checkbox id={`filter-${make}`} />
                                        <Label htmlFor={`filter-${make}`}>{make}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                            <Input type="number" placeholder="Min" />
                            <Input type="number" placeholder="Max" />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Body Type */}
                <AccordionItem value="body">
                    <AccordionTrigger>Body Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {["SUV", "Ute", "Sedan", "Hatchback", "Convertible", "Van", "Coupe", "Wagon"].map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox id={`filter-${type}`} />
                                    <Label htmlFor={`filter-${type}`}>{type}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Year */}
                <AccordionItem value="year">
                    <AccordionTrigger>Year</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-2 gap-2">
                            <Input type="number" placeholder="From" />
                            <Input type="number" placeholder="To" />
                        </div>
                    </AccordionContent>
                </AccordionItem>

            </Accordion>
        </div>
    );
}
