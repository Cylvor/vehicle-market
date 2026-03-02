import { ListingForm } from "@/components/modules/sell/listing-form";
import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function CreateListingPage() {
    const { userId } = await auth();

    let sellerName = "";
    let sellerLocation = "";

    if (userId) {
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            const unsafeMetadata = (user.unsafeMetadata ?? {}) as { location?: string; address?: string };
            const publicMetadata = (user.publicMetadata ?? {}) as { location?: string; address?: string };

            sellerName =
                user.fullName?.trim() ||
                [user.firstName, user.lastName].filter(Boolean).join(" ") ||
                "";
            sellerLocation =
                unsafeMetadata.location?.trim() ||
                unsafeMetadata.address?.trim() ||
                publicMetadata.location?.trim() ||
                publicMetadata.address?.trim() ||
                "";
        } catch {
            sellerName = "";
            sellerLocation = "";
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 pt-24 pb-16">
            <div className="container-width pt-10 lg:pt-14">
                <div className="max-w-4xl mx-auto mb-6 px-1">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                        {`Create a new listing`}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Fill in the details below to list your vehicle for sale.
                    </p>
                </div>
                <ListingForm sellerName={sellerName} sellerLocation={sellerLocation} />
            </div>
        </div>
    );
}
