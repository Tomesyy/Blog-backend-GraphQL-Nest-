import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostsService],
  exports: [PostsService],
  
})
export class PostsModule {
}
