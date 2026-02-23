"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface VehicleGalleryProps {
    images: string[];
}

export function VehicleGallery({ images }: VehicleGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    useEffect(() => {
        if (!isFullscreenOpen) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsFullscreenOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isFullscreenOpen]);

    return (
        <div className="space-y-4">
            <button
                type="button"
                onClick={() => setIsFullscreenOpen(true)}
                className="aspect-[16/10] relative overflow-hidden rounded-md border bg-muted w-full"
                aria-label="Open image in fullscreen"
            >
                <Image
                    src={selectedImage}
                    alt="Vehicle main image"
                    fill
                    className="object-cover"
                    priority
                />
            </button>
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        type="button"
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

            {isFullscreenOpen ? (
                <div
                    className="fixed inset-0 z-[80] bg-background/95 p-4 md:p-8"
                    onClick={() => setIsFullscreenOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Fullscreen vehicle image"
                >
                    <button
                        type="button"
                        onClick={() => setIsFullscreenOpen(false)}
                        className="fixed right-4 top-4 z-[81] inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background/90 text-foreground shadow-sm"
                        aria-label="Close fullscreen image"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="relative h-full w-full" onClick={(event) => event.stopPropagation()}>
                        <Image
                            src={selectedImage}
                            alt="Vehicle fullscreen image"
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
