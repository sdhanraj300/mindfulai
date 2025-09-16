import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) throw new UploadThingError("Unauthorized");
      return { userId: session.user.id } as const;
    })
    .onUploadComplete(async ({ file, metadata }) => {
      // file.url is the CDN URL
      return { uploadedBy: metadata.userId as string, url: file.url } as const;
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
