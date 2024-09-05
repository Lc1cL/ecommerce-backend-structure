import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderDetails.entity";
import { User } from "./users.entity";


@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @OneToOne(()=> OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails; 

    @ManyToOne(()=> User, (user) => user.orders)
    @JoinColumn({name : 'userId'})
    user: User;
}