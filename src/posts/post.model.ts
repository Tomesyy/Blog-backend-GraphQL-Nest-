import {Table, Model, Column, CreatedAt, UpdatedAt} from 'sequelize-typescript';

@Table
export class Post extends Model {
    @Column
    title: string

    @Column 
    content: string

    @CreatedAt
    createdAt: Date

    @UpdatedAt
    updatedAt: Date
}