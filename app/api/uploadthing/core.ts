import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const uploadThingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await currentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { ...user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const profile = await prismadb.profile.findUnique({
        where: { userId: metadata.id },
      });

      if (!profile) throw new Error("No profile found");

      prismadb.profile.update({
        where: { userId: metadata.id },
        data: { ...profile, profileImageUrl: file.url },
      });
    }),
} satisfies FileRouter;

export type uploadThingFileRouter = typeof uploadThingFileRouter;
