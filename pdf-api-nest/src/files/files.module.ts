import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { PrismaModule } from "../../prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        try {
          const buffer = Buffer.from(file.originalname, "latin1");
          file.originalname = buffer.toString("utf8");
        } catch (error) {
          console.log(error);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
