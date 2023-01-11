import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Query,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Response } from 'express';
import { zip } from 'compressing';
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    //上传多文件使用UploadedFiles
    console.log('file', file);
    return 'ff';
  }

  // 文件下载
  // 方式1：直接下载
  @Get('export')
  dowmLoda(@Res() res: Response) {
    const url = join(
      __dirname,
      '../../../public/upload/1673438773634-test_img.jpg',
    );
    res.download(url);
  }
  // 方式2：流的形式下载,下载完后的文件时二进制的形式，需要前端配合才能看（详看文件下载）
  @Get('stream')
  async dowm(@Res() res: Response) {
    const url = join(
      __dirname,
      '../../../public/upload/1673438773634-test_img.jpg',
    );
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=pp');
    tarStream.pipe(res);
  }
}
