import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const imageSingleRouter = {
	imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(async ({ req }) => {
			const session = await getServerSession(authOptions);
			if (!session) throw new Error("Unauthorized");

			return { userId: session.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			return {
				id: file.key,
				name: file.name,
				size: file.size,
				url: file.url,
				userId: metadata.userId,
				cAt: new Date().toISOString(),
			};
		}),
} satisfies FileRouter;

export type ImageSingleRouter = typeof imageSingleRouter;
