import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async getAllFolders() {
    return this.prisma.folder.findMany({
      include: {
        files: true,
      },
    });
  }

  async createFolder(name: string) {
    return this.prisma.folder.create({
      data: {
        name,
      },
    });
  }

  async getFolderById(id: number) {
    return this.prisma.folder.findUnique({
      where: { id },
      include: {
        files: true,
      },
    });
  }
}
