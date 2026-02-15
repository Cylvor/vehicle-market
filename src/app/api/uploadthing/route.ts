
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextRequest } from "next/server";

const handlers = createRouteHandler({
    router: ourFileRouter,
});

export const GET = handlers.GET;

export async function POST(req: NextRequest) {
    const response = await handlers.POST(req);

    // Log the response if it's a 500 error
    if (response.status >= 400) {
        const cloned = response.clone();
        try {
            const body = await cloned.text();
            console.error("UploadThing error response:", response.status, body);
        } catch {
            console.error("UploadThing error response:", response.status, "(could not read body)");
        }
    }

    return response;
}
