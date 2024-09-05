import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { Categories} from "./categories.entity";
import { OrderDetails } from "./orderDetails.entity";


@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({
        type:'varchar', 
        length:50,
        unique: true,
        nullable: false
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @Column({
        type:  'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @Column({
        type: 'int',
        nullable: false
    })
    stock: number;

    @Column({
        type: 'text'
    })
    imgUrl: string;

    @ManyToOne(()=> Categories, (category) => category.products)
    @JoinColumn({ name: 'categoryId'})
    category: Categories;

    @ManyToMany(()=> OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];

}