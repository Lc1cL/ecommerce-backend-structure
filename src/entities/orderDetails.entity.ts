import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orders.entity";
import { Product } from "./products.entity";

@Entity({name:'orderDetails'})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:'decimal',
        precision: 10,
        scale: 2
    })
    price:number;

    @OneToOne(()=> Order, (order) => order.orderDetails)
    @JoinColumn({name: 'orderId'})
    order:Order;

    @ManyToMany(()=> Product)
    @JoinTable({
        name: 'OrderDetails_Porduct',
        joinColumn:{
            name: 'productId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    products: any[];

}