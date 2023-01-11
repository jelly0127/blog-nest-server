import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDTO } from 'src/common/dto/Page.dto';
import { getPagination } from 'src/utils/index.util';
import { Repository } from 'typeorm';
import { PictureInfoVO } from './vo/picture-info.vo';
import { encryptFileMD5 } from 'src/utils/cryptogram.util';
import { uploadStaticSrc } from 'src/config/upload/upload.config';
import { Picture } from './entities/picture.entity';
import { PictureCreateDto } from './dto/picture-create.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { IdDTO } from 'src/common/dto/id.dto';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async getMany(pageDto: PageDTO) {
    const { page, pageSize } = pageDto;
    const getList = this.pictureRepository
      .createQueryBuilder('picture')
      .select(['picture.src', 'picture.id', 'picture.sign'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);

    return {
      list,
      pagination,
    };
  }

  async create(pictureCreateDTO: PictureCreateDto): Promise<PictureInfoVO> {
    const picture = new Picture();
    picture.src = pictureCreateDTO.src;
    picture.sign = pictureCreateDTO.sign;
    const result = await this.pictureRepository.save(picture);
    return {
      info: result,
    };
  }

  async getOneBySign(sign: string) {
    const res = await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.sign = :sign', { sign })
      .getOne();
    return res;
  }

  async getOneById(idDto: IdDTO) {
    const { id } = idDto;

    const res = await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.id = :id', { id })
      .getOne();

    return {
      info: res,
    };
  }

  async upload(file: any) {
    const { buffer } = file;

    const currentSign = encryptFileMD5(buffer);
    const hasPicture = await this.getOneBySign(currentSign);

    if (hasPicture) {
      return {
        info: {
          src: hasPicture.src,
          isHas: true,
        },
      };
    }

    const writeStream = createWriteStream(
      join(__dirname, uploadStaticSrc, `${file.originalname}`),
    );
    writeStream.write(file.buffer);

    const src = uploadStaticSrc + '/' + file.originalname;

    this.create({ src, sign: currentSign });

    return {
      info: {
        src,
        isHas: false,
      },
    };
  }
}
