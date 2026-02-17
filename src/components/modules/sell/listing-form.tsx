"use client"

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, type VehicleInput } from "@/lib/validations/vehicle";
import { createVehicle, updateVehicle } from "@/actions/vehicle";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ListingFormProps {
    vehicleId?: string;
    initialData?: VehicleInput;
}

export function ListingForm({ vehicleId, initialData }: ListingFormProps) {
    const isEditMode = Boolean(vehicleId);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(initialData?.images ?? []);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onUploadError: (error) => {
            toast.error(`Upload failed: ${error.message}`);
        },
    });

    const form = useForm<VehicleInput>({
        resolver: zodResolver(vehicleSchema) as any,
        defaultValues: {
            year: initialData?.year,
            make: initialData?.make ?? "",
            model: initialData?.model ?? "",
            variant: initialData?.variant ?? "",
            price: initialData?.price,
            odometer: initialData?.odometer,
            description: initialData?.description ?? "",
            fuel: initialData?.fuel,
            transmission: initialData?.transmission,
            bodyType: initialData?.bodyType,
            colour: initialData?.colour ?? "",
            features: initialData?.features ?? [],
            images: initialData?.images ?? [],
        },
    });

    useEffect(() => {
        return () => {
            newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [newImagePreviews]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Add new files to existing selection
        const newFiles = [...selectedFiles, ...files];
        setSelectedFiles(newFiles);

        // Generate previews for new files
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        const mergedNewPreviews = [...newImagePreviews, ...newPreviews];
        setNewImagePreviews(mergedNewPreviews);

        // Update form value to pass validation (temporarily with placeholder URLs)
        // These will be replaced with real URLs on submit
        form.setValue("images", [...existingImages, ...mergedNewPreviews], {
            shouldValidate: true,
            shouldDirty: true,
        });
        form.clearErrors("images");

        // Reset input so same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (index: number) => {
        if (index < existingImages.length) {
            const updatedExistingImages = existingImages.filter((_, i) => i !== index);
            setExistingImages(updatedExistingImages);

            form.setValue("images", [...updatedExistingImages, ...newImagePreviews], {
                shouldValidate: true,
                shouldDirty: true,
            });

            return;
        }

        const newIndex = index - existingImages.length;
        URL.revokeObjectURL(newImagePreviews[newIndex]);

        const updatedFiles = selectedFiles.filter((_, i) => i !== newIndex);
        const updatedNewPreviews = newImagePreviews.filter((_, i) => i !== newIndex);
        setSelectedFiles(updatedFiles);
        setNewImagePreviews(updatedNewPreviews);

        // Update form
        form.setValue("images", [...existingImages, ...updatedNewPreviews], {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmit = async (data: VehicleInput) => {
        try {
            setIsSubmitting(true);

            let uploadedImageUrls: string[] = [];

            if (selectedFiles.length > 0) {
                toast.info("Uploading images...");
                const uploadResult = await startUpload(selectedFiles);

                if (!uploadResult || uploadResult.length === 0) {
                    toast.error("Image upload failed. Please try again.");
                    setIsSubmitting(false);
                    return;
                }

                uploadedImageUrls = uploadResult.map((result) => result.url);
            }

            const finalImages = [...existingImages, ...uploadedImageUrls];

            if (finalImages.length === 0) {
                toast.error("Please select at least one image");
                setIsSubmitting(false);
                return;
            }

            const submissionData = {
                ...data,
                images: finalImages,
            };

            if (isEditMode && vehicleId) {
                await updateVehicle(vehicleId, submissionData);
                toast.success("Listing updated!");
            } else {
                await createVehicle(submissionData);
                toast.success("Listing created!", {
                    description: "Your vehicle has been submitted for approval.",
                });
            }

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong", {
                description: "Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 p-6 bg-card rounded-lg border shadow-sm">
            <div>
                <h2 className="text-2xl font-bold">Create your listing</h2>
                <p className="text-muted-foreground">Fill in the details below to list your vehicle.</p>
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Vehicle Identity */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Vehicle Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="year"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="2024"
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="make"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Make</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Toyota" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Model</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Camry" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="variant"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Variant</FormLabel>
                                        <FormControl>
                                            <Input placeholder="SE" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="bodyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Body Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Sedan", "Hatchback", "SUV", "Ute", "Coupe", "Convertible", "Van", "Wagon"].map((type) => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fuel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fuel</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Petrol", "Diesel", "Electric", "Hybrid", "LPG"].map((type) => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="transmission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Transmission</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Automatic", "Manual", "CVT", "DCT"].map((type) => (
                                                        <SelectItem key={type} value={type}>{type}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="odometer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Odometer (km)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Description & Price */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Description & Price</h3>
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...field}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell buyers about your car..."
                                            className="min-h-[150px]"
                                            {...field}
                                            value={field.value ?? ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator />

                    {/* Photos */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Photos</h3>
                        <p className="text-sm text-muted-foreground">
                            Select images to preview. They will be uploaded when you publish.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {[...existingImages, ...newImagePreviews].map((preview, idx) => (
                                <div key={idx} className="relative aspect-[4/3] group">
                                    <img
                                        src={preview}
                                        alt={`Preview ${idx + 1}`}
                                        className="w-full h-full object-cover rounded-md border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            {/* Add Image Button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[4/3] border-2 border-dashed rounded-md flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors cursor-pointer"
                            >
                                <ImagePlus className="h-8 w-8" />
                                <span className="text-xs font-medium">Add Photos</span>
                            </button>

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        {selectedFiles.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                                {selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""} selected
                            </p>
                        )}

                        {form.formState.errors.images && (
                            <p className="text-sm font-medium text-destructive">
                                {form.formState.errors.images.message}
                            </p>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" size="lg" disabled={isSubmitting || isUploading}>
                            {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isUploading ? "Uploading Images..." : isEditMode ? "Save Changes" : "Publish Listing"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
