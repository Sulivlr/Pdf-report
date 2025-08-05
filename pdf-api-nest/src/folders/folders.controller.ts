import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from "@nestjs/common";
import { FoldersService } from "./folders.service";
import { CreateFolderDto } from "./create-folder.dto";

@Controller("folders")
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async getAllFolders() {
    return this.foldersService.getAllFolders();
  }

  @Post()
  async createFolder(@Body() dto: CreateFolderDto) {
    return this.foldersService.createFolder(dto.name);
  }

  @Get(":id")
  async getFolderById(@Param("id", ParseIntPipe) id: number) {
    const folder = await this.foldersService.getFolderById(id);
    if (!folder) {
      throw new NotFoundException(`Папка с id ${id} не найдена`);
    }
    return folder;
  }
}
