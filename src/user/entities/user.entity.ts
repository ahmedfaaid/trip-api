import { Address } from 'src/address/entities/address.entity';
import { Image } from 'src/image/entities/image.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @OneToMany(() => Post, (post) => post.posted_by, { nullable: true })
  posts: Post[];

  @OneToMany(() => User, (user) => user.followers, { nullable: true })
  following: User[];

  @ManyToOne(() => User, (user) => user.following, { nullable: true })
  @JoinColumn({ name: 'followers_id' })
  followers: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
