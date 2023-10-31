import { generateComponents } from "@uploadthing/react";

import type { uploadThingFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton } = generateComponents<uploadThingFileRouter>();
