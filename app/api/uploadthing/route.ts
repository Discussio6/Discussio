import { createNextRouteHandler } from "uploadthing/next";

import { imageSingleRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
	router: imageSingleRouter,
	config: {
		uploadthingId: process.env.UPLOADTHING_APP_ID,
		uploadthingSecret: process.env.UPLOADTHING_SECRET,
		callbackUrl: `${process.env.UPLOADTHING_URL}/api/uploadthing`,
	},
});
