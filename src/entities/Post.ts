import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Image } from './index'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  title: string

  @OneToMany(_ => Image, image => image.post, { nullable: true })
  images: Image[]
}
