// src/modules/tag/entity/tag.entity.ts

import { Common } from 'src/common/entity/common.entity';
import { Article } from 'src/modules/article/entities/article.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends Common {
  // 标签名称
  @Column()
  label: string;

  // 文章
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
