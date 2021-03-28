import { ParseIntPipe, UseGuards } from '@nestjs/common';
import {Args, Query, Resolver, Mutation} from '@nestjs/graphql';
import { PostsService} from './posts.service';
import {Post} from './post.model';
import {PostInterface} from './post.interface';

@Resolver('Post')
export class PostResolver {
    constructor(private postService: PostsService){}

    @Query('post')
    async findOne(@Args('id', ParseIntPipe)id: number): Promise<Post> {
        let data = await this.postService.findOne(id);
        return data;
    }

    @Query('posts')
    async findAll(): Promise<Post[]>{
        return this.postService.findAll();
    }

    @Mutation('createPost')
    async createPost(@Args('payload') payload: PostInterface): Promise<Post> {
        let data = await this.postService.Create(payload);
        return data;
    }

    @Mutation('updatePost')
    async updatePost(@Args('id', ParseIntPipe)id: number,@Args('payload') payload: PostInterface): Promise<Post> {
        let data = await this.postService.updateOne(id, payload);
        return data;
    }

    @Mutation('deletePost')
    async deletePost(@Args('id', ParseIntPipe)id: number): Promise<String>{
        await this.postService.deleteOne(id);
        return "Post deleted successfully";
    }
}