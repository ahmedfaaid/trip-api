import { Address } from 'src/address/entities/address.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Image, { nullable: true })
  @JoinColumn({ name: 'profile_picture_id' })
  profile_picture?: Image;

  @Column()
  date_of_birth: Date;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ nullable: false })
  occupation: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  bio: string;

  @OneToMany(() => Post, (post) => post.posted_by, { nullable: true })
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.following, {
    nullable: true,
    cascade: true
  })
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.follower, {
    nullable: true,
    cascade: true
  })
  followers: User[];

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  website: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
