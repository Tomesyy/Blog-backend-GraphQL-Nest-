import { Controller, Get, Post, Req, HttpStatus, Res, Put, Delete } from '@nestjs/common';
import {Request, Response} from 'express';
import { PostInterface } from './post.interface';
import { PostsService} from './posts.service';



interface ApiResponse {
    status: number,
    message: string,
    data?: PostInterface[]
}

@Controller('posts')
export class PostController {
    constructor(private postService: PostsService){
        
    }
    @Get()
    async findAll(@Req() req: Request, @Res() res: Response) {
        let data = await this.postService.findAll()
        return res.status(HttpStatus.FOUND).json({
            status: HttpStatus.FOUND, 
            message: "Posts found successfully", 
            data: data
        });
    }

    @Get(':id')
    async findOne(@Req() req: Request, @Res() res: Response) {
        let id: string = req.params.id;
        let data = await this.postService.findOne(id);
        if(!data){
            return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND, 
                message: `Post with id ${id} doesn't exist`
            });
        }
        return res.status(HttpStatus.FOUND).json({
            status: HttpStatus.FOUND, 
            message: "Post found successfully", 
            data: data
        });
    }

    @Post()
    async createPost(@Req() req: Request, @Res() res: Response) {
        let payload: PostInterface = req.body;
        let data = await this.postService.Create(payload);

        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED, 
            message: "Post created successfully", 
            data: data
        });
    }

    @Put(':id')
    async updatePost(@Req() req: Request, @Res() res: Response) {
        let id: string = req.params.id;
        let payload: PostInterface = req.body;
        let data = await this.postService.updateOne(id, payload);

        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK, 
            message: "Post updated successfully", 
            data: data
        });
    }

    @Delete(':id')
    async deletePost(@Req() req: Request, @Res() res: Response) {
        let id: string = req.params.id;
        await this.postService.deleteOne(id);
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK, 
            message: "Post deleted successfully"
        });
    }
}