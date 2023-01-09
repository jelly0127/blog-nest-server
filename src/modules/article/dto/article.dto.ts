// src/modules/article/dto/article.dto.ts

import { IsNotEmpty } from 'class-validator';
import { Tag } from 'src/modules/tag/entities/tag.entity';

export class ArticleDTO {
  /**
   * 文章标题
   * @example 啊！美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  /**
   * 文章简述
   * @example 给你讲述美丽的大海
   */
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  /**
   * 文章内容
   * @example 啊！美丽的大海，你是如此美丽
   */
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;

  /**
   * 标签 格式 [{id: 1}, {id: 2}]
   * @example  [{id: 1}]
   */
  readonly tags?: Tag[];
}
