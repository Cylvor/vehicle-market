"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Upload, X } from "lucide-react";

export function ListingForm() {
    const [images, setImages] = useState<string[]>([]);

    // Mock generic image upload
    const handleImageUpload = () => {
        // In a real app, this would handle file input
        const newImage = "/vehicles/tesla-model-3.svg"; // Mock
        setImages([...images, newImage]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 p-6 bg-card rounded-lg border shadow-sm">
            <div>
                <h2 className="text-2xl font-bold">Create your listing</h2>
                <p className="text-muted-foreground">Fill in the details below to list your vehicle.</p>
            </div>

            <Separator />

            <form className="space-y-8">
                {/* Vehicle Identity */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" placeholder="e.g. 2020" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="make">Make</Label>
                            <Input id="make" placeholder="e.g. Toyota" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" placeholder="e.g. Corolla" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="variant">Variant/Badge</Label>
                            <Input id="variant" placeholder="e.g. ZR Hybrid" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="body">Body Type</Label>
                            <Input id="body" placeholder="e.g. Hatchback" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="odometer">Odometer (km)</Label>
                            <Input id="odometer" type="number" placeholder="0" />
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Description & Price */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Description & Price</h3>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                            <Input id="price" type="number" className="pl-7" placeholder="0.00" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Tell buyers why they should buy your car..."
                            className="min-h-[150px]"
                        />
                    </div>
                </div>

                <Separator />

                {/* Photos */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Photos</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/3] group">
                                <img src={img} alt="Upload" className="w-full h-full object-cover rounded-md border" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="flex flex-col items-center justify-center aspect-[4/3] border-2 border-dashed rounded-md hover:bg-muted/50 transition-colors"
                        >
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Add Photo</span>
                        </button>
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-4">
                    <Button variant="outline">Save Draft</Button>
                    <Button size="lg">Publish Listing</Button>
                </div>
            </form>
        </div>
    );
}
