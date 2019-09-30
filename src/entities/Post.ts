import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Image } from './index'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ default: false })
  archived: boolean

  @OneToMany(_ => Image, image => image.post, { nullable: true })
  images: Image[]
}
