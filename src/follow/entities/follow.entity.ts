import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'followed_user_id' })
  followed_user: User;
}
