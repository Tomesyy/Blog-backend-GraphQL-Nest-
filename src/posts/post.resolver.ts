import { ParseIntPipe, UseGuards, HttpStatus } from '@nestjs/common';
import {Args, Query, Resolver, Mutation} from '@nestjs/graphql';
import { PostsService} from './posts.service';
import {Post} from './post.model';
import {PostInterface} from './post.interface';


@Resolver('Post')
export class PostResolver {
    constructor(private postService: PostsService){}

    @Query('post')
    async findOne(@Args('id', ParseIntPipe)id: number) {
        let data = await this.postService.findOne(id);
        if(!data){
            return ({
                status: HttpStatus.NOT_FOUND, 
                message: `Post with id ${id} doesn't exist`
            });
        }
        return ({
            status: HttpStatus.FOUND, 
            message: "Post found successfully", 
            data: [data]
        });
    }

    @Query('posts')
    async findAll(){
        let data = await this.postService.findAll()
        return ({
            status: HttpStatus.FOUND, 
            message: "Posts found successfully", 
            data: data
        });
    }

    @Mutation('createPost')
    async createPost(@Args('payload') payload: PostInterface) {
        let data = await this.postService.Create(payload);
        return ({
            status: HttpStatus.CREATED, 
            message: "Post created successfully", 
            data: [data]
        });
    }

    @Mutation('updatePost')
    async updatePost(@Args('id', ParseIntPipe)id: number,@Args('payload') payload: PostInterface){
        let data = await this.postService.updateOne(id, payload);
        if(!data){
            return ({
                status: HttpStatus.NOT_FOUND, 
                message: `Post with id ${id} doesn't exist`
            });
        }
        return ({
            status: HttpStatus.OK, 
            message: "Post updated successfully", 
            data: [data]
        });
    }

    @Mutation('deletePost')
    async deletePost(@Args('id', ParseIntPipe)id: number){
        let data = await this.postService.findOne(id);
        if(!data){
            return ({
                status: HttpStatus.NOT_FOUND, 
                message: `Post with id ${id} doesn't exist`
            });
        }
        return ({
            status: HttpStatus.OK, 
            message: "Post deleted successfully"
        });
    }
}