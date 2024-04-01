import { Address } from 'src/address/entities/address.entity';
import { Image } from 'src/image/entities/image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
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

  // Add relationship column for posts
}
