import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostInterface } from './post.interface';
import { Post } from './post.model';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post)
        private postModel: typeof Post,){}

    async Create(newPost: PostInterface): Promise<Post> {
        let created = await this.postModel.create(newPost)
        return created.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.findAll();
    }

    async findOne(id: number): Promise<Post> {
        return this.postModel.findOne({where: {
            id
        }});
    }

    async updateOne(id: number, payload: PostInterface): Promise<Post> {
        let item = await this.findOne(id);
        await item.update(payload);
        return this.findOne(id);
    }

    async deleteOne(id: number): Promise<void> {
        let item = await this.findOne(id);
        await item.destroy();
    }

}
