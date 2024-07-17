import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;

  @ManyToOne(() => User, (user) => user.following)
  following: User;
}
