import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  line_1: string;

  @Column({ nullable: true })
  line_2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @UpdateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
