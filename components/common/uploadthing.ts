import { generateComponents } from "@uploadthing/react";

import type { ImageSingleRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
	generateComponents<ImageSingleRouter>();
