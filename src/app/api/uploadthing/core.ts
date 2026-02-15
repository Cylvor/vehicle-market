
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = async () => {
    console.log("UploadThing handleAuth called");
    const { userId } = await auth();
    if (!userId) {
        console.error("UploadThing Unauthorized");
        throw new Error("Unauthorized");
    }
    console.log("UploadThing authorized for user:", userId);
    return { userId };
};

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
        .middleware(async () => await handleAuth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
