"use client"

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
    images: string[];
}

export function VehicleGallery({ images }: VehicleGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="space-y-4">
            <div className="aspect-[16/10] relative overflow-hidden rounded-lg border bg-muted">
                <Image
                    src={selectedImage}
                    alt="Vehicle main image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                            "relative aspect-[16/10] overflow-hidden rounded-md border bg-muted transition-all hover:opacity-100",
                            selectedImage === image ? "ring-2 ring-primary ring-offset-2 opacity-100" : "opacity-70"
                        )}
                    >
                        <Image
                            src={image}
                            alt={`Vehicle view ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
