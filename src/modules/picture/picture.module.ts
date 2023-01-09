// src/modules/picture/picture.modules.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
