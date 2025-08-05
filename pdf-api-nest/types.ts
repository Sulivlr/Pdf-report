import { File } from "@prisma/client";

export interface FileWithMetadata extends File {
  size?: number;
  mimetype?: string;
}
