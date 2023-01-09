// src/modules/article/dto/article-list.dto.ts

import { PageDTO } from 'src/common/dto/Page.dto';

export class ArticleListDTO extends PageDTO {
  /**
   * tagId
   * @example 1
   */
  tagId?: number;
}
