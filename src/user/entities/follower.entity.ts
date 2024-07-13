import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Follower {
  @PrimaryColumn()
  user_id: number;

  @Column()
  follower_id: number;
}
