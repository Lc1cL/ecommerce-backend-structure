import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";


@Injectable()
export class OrderService{

    constructor(private readonly ordersRepository: OrderRepository){}

    addOrder(userId: string, products: any){
        return this.ordersRepository.addOrder(userId, products)
    }

    getOrder(id: string ){
        return this.ordersRepository.getOrder(id)
    }

}