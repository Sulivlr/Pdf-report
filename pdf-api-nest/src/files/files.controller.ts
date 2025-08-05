import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Body,
  Param,
  NotFoundException,
  Res,
  StreamableFile,
} from "@nestjs/common";
import type { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service";
import { File } from "@prisma/client";
import { UploadFileDto } from "./upload-file.dto";
import { createReadStream } from "fs";
import { join } from "path";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadFileDto,
  ): Promise<File> {
    console.log("upload", file);
    console.log("Original name bytes:", Buffer.from(file.originalname, "utf8"));
    return await this.filesService.uploadFile(file, dto.folderId);
  }

  @Get()
  async getAllFiles(): Promise<File[]> {
    return await this.filesService.getAllFiles();
  }

  @Get(":id")
  async getFileById(@Param("id", ParseIntPipe) id: number): Promise<File> {
    const file = await this.filesService.getFileById(id);
    if (!file) {
      throw new NotFoundException(`Файл с id ${id} не найден`);
    }
    return file;
  }

  @Get(":id/download")
  async downloadFile(
    @Param("id", ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const file = await this.filesService.getFileById(id);

    if (!file) {
      throw new NotFoundException(`Файл с id ${id} не найден`);
    }

    const fileStream = createReadStream(join(process.cwd(), file.path));

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${file.name}"`,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    });

    return new StreamableFile(fileStream);
  }
}
