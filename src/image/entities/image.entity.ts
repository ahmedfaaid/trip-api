import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;

  @ManyToOne(() => Post, (post) => post.images, {
    nullable: true
  })
  @JoinColumn({ name: 'post_id' })
  post?: Post;
}
