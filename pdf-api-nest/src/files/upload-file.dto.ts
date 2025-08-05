import { IsInt, Min } from "class-validator";
import { Type } from "class-transformer";

export class UploadFileDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  folderId: number;
}
