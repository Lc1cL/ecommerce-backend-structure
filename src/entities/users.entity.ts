import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'bigint'
  })
  phone: number;

  @Column({
    type: 'text'
  })
  address: string;

  @Column({
    type:'varchar',
    length:50
  })
  country: string;

  @Column({
    type:'varchar',
    length: 50
  })
  city: string;

  @Column({
    type: Date
  })
  birthdate: Date;

  @Column({default: false})
  isAdmin: boolean;

  @OneToMany(()=> Order, (order) => order.user)
  @JoinColumn({ name : 'order_id'})
  orders: Order[];
}
