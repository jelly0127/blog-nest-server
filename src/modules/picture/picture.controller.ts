import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { PageDTO } from 'src/common/dto/Page.dto';
import { PictureService } from './picture.service';
import { PictureInfoSuccessVO, PictureInfoVO } from './vo/picture-info.vo';
import { PictureListSuccessVO, PictureListVO } from './vo/picture-list.vo';
import type { Response } from 'express';
import { zip } from 'compressing';
@ApiTags('图床模块')
@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}

  //获取所有文件
  @ApiOkResponse({ description: '图片列表', type: PictureListSuccessVO })
  @Get('list')
  async getMany(@Query() pageDto: PageDTO): Promise<PictureListVO> {
    return await this.pictureService.getMany(pageDto);
  }
  //文件上传
  @ApiOkResponse({ description: '上传图片', type: PictureInfoSuccessVO })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: any): Promise<PictureInfoVO> {
    return await this.pictureService.upload(file);
  }

  // 文件下载
  // 方式1：直接下载
  @Get('export')
  async downLoad(@Query() id, @Res() res: Response) {
    const { info } = await this.pictureService.getOneById(id);

    const url = join(__dirname, info.src);

    res.download(url);
  }
  // 方式2：流的形式下载,下载完后的文件时二进制的形式，需要前端配合才能看（详看文件下载）
  @Get('stream')
  async down(@Query() id, @Res() res: Response) {
    const { info } = await this.pictureService.getOneById(id);

    const url = join(__dirname, info.src);

    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment;filename=pp');
    tarStream.pipe(res);
  }
}
