import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { OrderService } from './orders.service';

@Module({
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetails])],
    controllers:[OrdersController],
    providers:[OrderService, OrderRepository],

})
export class OrdersModule {}
