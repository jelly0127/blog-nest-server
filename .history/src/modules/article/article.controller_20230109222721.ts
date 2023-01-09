// src/modules/article/article.controller.ts

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  getMore() {
    return '文章列表';
  }

  @Get('info')
  getOne(@Query() id: string) {
    return '文章详情';
  }

  @Post('create')
  create(@Body() article: Article) {
    return '创建文章';
  }

  @Post('edit')
  update(@Body() article: Article) {
    return '编辑文章';
  }

  @Post('remove')
  delete(@Body() id: number) {
    return '删除文章';
  }
}
