import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
