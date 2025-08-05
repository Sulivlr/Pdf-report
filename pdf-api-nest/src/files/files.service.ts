import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { File } from "@prisma/client";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, folderId: number): Promise<File> {
    const rootDir = path.resolve(__dirname, "../../");
    const uploadDir = path.join(rootDir, "uploads");

    const folderExists = await this.prisma.folder.findUnique({
      where: { id: folderId },
    });
    if (!folderExists) {
      throw new Error(`Folder with id ${folderId} not found`);
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.originalname);

    fs.writeFileSync(filePath, file.buffer);
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        path: filePath,
        folderId,
      },
    });
  }

  async getAllFiles(): Promise<File[]> {
    return this.prisma.file.findMany();
  }

  async getFileById(id: number): Promise<File | null> {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }
}
