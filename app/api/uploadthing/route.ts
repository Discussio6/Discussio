import { createNextRouteHandler } from "uploadthing/next";

import { imageSingleRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
	router: imageSingleRouter,
});
