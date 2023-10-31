import { createNextRouteHandler } from "uploadthing/next";

import { uploadThingFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadThingFileRouter,
});
