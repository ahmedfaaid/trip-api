import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Follower {
  @PrimaryColumn({ type: 'int', insert: false, select: false, update: false })
  id: never;

  @Column()
  user_id: number;

  @Column()
  follower_id: number;
}
