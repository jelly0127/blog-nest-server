import { Controller, Body, Query, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ArticleListVO } from './vo/article-list.vo';
import { AuthGuard } from '@nestjs/passport';
import { ArticleListDTO } from './dto/article-list.dto';
@ApiTags('文章模块')
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async getMore(
    @Query() articleListDto: ArticleListDTO,
  ): Promise<ArticleListVO> {
    const { tagId } = articleListDto;
    if (tagId) {
      return await this.articleService.getMoreByTagId(articleListDto);
    }
    return await this.articleService.getMore(articleListDto);
  }

  @Get('info')
  getOne(@Query() idDto: IdDTO) {
    return this.articleService.getOne(idDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() articleCreateDTO: ArticleCreateDTO) {
    return this.articleService.create(articleCreateDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('edit')
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  delete(@Body() idDto: IdDTO) {
    return this.articleService.remove(idDto);
  }
}
