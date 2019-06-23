import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Post } from './index'

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(_ => Post, post => post.images)
  post: Post
}
