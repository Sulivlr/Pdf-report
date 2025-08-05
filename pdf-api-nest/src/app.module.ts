import { Module } from "@nestjs/common";
import { FilesModule } from "./files/files.module";
import { FoldersModule } from "./folders/folders.module";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule, FilesModule, FoldersModule],
})
export class AppModule {}
