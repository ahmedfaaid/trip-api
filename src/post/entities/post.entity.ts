import { Image } from 'src/image/entities/image.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  region: string; // this is the continent

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  details: string; // markdown text

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'posted_by_id' })
  posted_by: User;

  @OneToMany(() => Image, (image) => image.post)
  media: Image[];

  @Column('simple-json')
  length_of_stay: {
    months: number;
    weeks: number;
    days: number;
  }; // json string of months, weeks and days

  @Column()
  date_travelled: Date;

  @Column()
  size_of_group: number;

  @Column('simple-json')
  total_budget: {
    currency: string;
    accommodation: number;
    food_drinks: number;
    activities: number;
    transportation: number;
  }; // json string total budget of accommodation, food & drinks, activities and transportation

  @Column({ unique: true })
  slug: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
