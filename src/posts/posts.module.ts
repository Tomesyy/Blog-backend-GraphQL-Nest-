import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import {PostResolver} from './post.resolver';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostsService, PostResolver],
  exports: [PostsService],
  
})
export class PostsModule {
}
