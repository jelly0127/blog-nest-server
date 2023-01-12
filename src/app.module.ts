// src/app.modules.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './modules/article/article.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { PictureModule } from './modules/picture/picture.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 使用 TypeORM 配置数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_blog',
      entities: ['dist/modules/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ArticleModule,
    UserModule,
    TagModule,
    PictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
