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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ListingFormProps {
    vehicleId?: string;
    initialData?: VehicleInput;
    sellerName?: string;
    sellerLocation?: string;
}

export function ListingForm({ vehicleId, initialData, sellerName, sellerLocation }: ListingFormProps) {
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
            sellerName: initialData?.sellerName ?? sellerName ?? "",
            sellerLocation: initialData?.sellerLocation ?? sellerLocation ?? "",
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
            tags: initialData?.tags ?? [],
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

            router.push("/dashboard/seller/listings");
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
        <div className="max-w-4xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">

                    {/* ── Section 1: Seller Details ── */}
                    <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-blue-600 rounded-sm" />
                            <h3 className="text-base font-semibold text-slate-900">Seller Details</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="sellerName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-600">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                placeholder="John Doe"
                                                {...field}
                                                value={field.value ?? ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="sellerLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-600">Location</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                                                placeholder="Melbourne, VIC"
                                                {...field}
                                                value={field.value ?? ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="h-3" />

                    {/* ── Section 2: Vehicle Details ── */}
                    <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-blue-600 rounded-sm" />
                            <h3 className="text-base font-semibold text-slate-900">Vehicle Details</h3>
                        </div>

                        <div className="space-y-5">
                            {/* Row: Year / Make / Model / Variant */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-slate-600">Year</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500"
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
                                            <FormLabel className="text-sm font-medium text-slate-600">Make</FormLabel>
                                            <FormControl>
                                                <Input className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500" placeholder="Toyota" {...field} value={field.value ?? ''} />
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
                                            <FormLabel className="text-sm font-medium text-slate-600">Model</FormLabel>
                                            <FormControl>
                                                <Input className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500" placeholder="Camry" {...field} value={field.value ?? ''} />
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
                                            <FormLabel className="text-sm font-medium text-slate-600">Variant <span className="text-slate-400 font-normal">(Optional)</span></FormLabel>
                                            <FormControl>
                                                <Input className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500" placeholder="Ascent Sport" {...field} value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Row: Body / Fuel / Transmission / Odometer */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <FormField
                                    control={form.control}
                                    name="bodyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-slate-600">Body Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-10 rounded-md border-slate-200 bg-white focus:ring-1 focus:ring-blue-500">
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
                                            <FormLabel className="text-sm font-medium text-slate-600">Fuel Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-10 rounded-md border-slate-200 bg-white focus:ring-1 focus:ring-blue-500">
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
                                <FormField
                                    control={form.control}
                                    name="transmission"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-slate-600">Transmission</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="h-10 rounded-md border-slate-200 bg-white focus:ring-1 focus:ring-blue-500">
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
                                            <FormLabel className="text-sm font-medium text-slate-600">Odometer (km)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500"
                                                    type="number"
                                                    placeholder="45,000"
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

                            {/* Row: Colour / Tags */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="colour"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-slate-600">Colour</FormLabel>
                                            <FormControl>
                                                <Input className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500" placeholder="Polar White" {...field} value={field.value ?? ''} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium text-slate-600">Search Tags <span className="text-slate-400 font-normal">(comma separated)</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-10 rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500"
                                                    placeholder="One owner, Log books, Rego included"
                                                    value={(field.value ?? []).join(", ")}
                                                    onChange={(e) => {
                                                        const tags = e.target.value
                                                            .split(",")
                                                            .map((tag) => tag.trim())
                                                            .filter(Boolean);
                                                        field.onChange(tags);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Key Features */}
                            <FormField
                                control={form.control}
                                name="features"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-slate-600">Key Features <span className="text-slate-400 font-normal">(comma separated)</span></FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500 min-h-[80px] resize-y text-sm"
                                                placeholder="Leather seats, Sunroof, Apple CarPlay, Adaptive Cruise Control"
                                                value={(field.value ?? []).join(", ")}
                                                onChange={(e) => {
                                                    const features = e.target.value
                                                        .split(",")
                                                        .map((feature) => feature.trim())
                                                        .filter(Boolean);
                                                    field.onChange(features);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="h-3" />

                    {/* ── Section 3: Pricing & Description ── */}
                    <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-6 bg-blue-600 rounded-sm" />
                            <h3 className="text-base font-semibold text-slate-900">Pricing & Description</h3>
                        </div>
                        <div className="space-y-5">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="max-w-xs">
                                        <FormLabel className="text-sm font-medium text-slate-600">Listing Price</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium select-none">$</span>
                                                <Input
                                                    className="h-10 rounded-md border-slate-200 bg-white pl-7 font-semibold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus-visible:ring-1 focus-visible:ring-blue-500"
                                                    type="number"
                                                    placeholder="25,000"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                                />
                                            </div>
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
                                        <FormLabel className="text-sm font-medium text-slate-600">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="rounded-md border-slate-200 bg-white placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-blue-500 min-h-[140px] resize-y text-sm leading-relaxed"
                                                placeholder="Tell buyers about your vehicle's history, condition, and why you're selling..."
                                                {...field}
                                                value={field.value ?? ''}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="h-3" />

                    {/* ── Section 4: Photos ── */}
                    <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-6 bg-blue-600 rounded-sm" />
                            <h3 className="text-base font-semibold text-slate-900">Photos</h3>
                        </div>
                        <p className="text-sm text-slate-400 mb-5 ml-4">
                            Upload high-quality images. The first image will be the cover photo.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {[...existingImages, ...newImagePreviews].map((preview, idx) => (
                                <div key={idx} className="relative aspect-[4/3] group rounded-md overflow-hidden border border-slate-200 bg-slate-50">
                                    <img
                                        src={preview}
                                        alt={`Preview ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {idx === 0 && (
                                        <span className="absolute bottom-1.5 left-1.5 bg-blue-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm tracking-wide">
                                            Cover
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-1.5 right-1.5 bg-white/90 text-slate-600 rounded-md p-1 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}

                            {/* Add Image */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[4/3] border-2 border-dashed border-slate-200 bg-slate-50 rounded-md flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer"
                            >
                                <ImagePlus className="h-6 w-6" />
                                <span className="text-xs font-medium">Add Photos</span>
                            </button>

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
                            <p className="text-xs text-blue-600 font-medium mt-3">
                                {selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""} attached
                            </p>
                        )}

                        {form.formState.errors.images && (
                            <p className="text-sm font-medium text-red-500 mt-3">
                                {form.formState.errors.images.message}
                            </p>
                        )}
                    </div>

                    <div className="h-3" />

                    {/* ── Actions ── */}
                    <div className="bg-white border border-slate-200 rounded-md px-6 sm:px-8 py-4 flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            className="h-9 px-5 rounded-md text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="h-9 px-6 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                        >
                            {(isSubmitting || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isUploading ? "Uploading..." : isEditMode ? "Save Changes" : "Publish Listing"}
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    );
}
