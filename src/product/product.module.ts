import { Module } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { ProductsController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/products.entity";
import { Categories } from "src/entities/categories.entity";
import { Order } from "src/entities/orders.entity";


@Module ({
    imports: [TypeOrmModule.forFeature([Product, Categories, Order])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductRepository],
})

export class ProductModule {}