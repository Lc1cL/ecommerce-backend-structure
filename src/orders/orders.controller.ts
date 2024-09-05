import { Controller, Get, Param, Post, Body, ParseUUIDPipe, UseGuards, Delete} from "@nestjs/common";
import { OrderService } from "./orders.service";
import { CreateOrderDto } from "./orders.dto";
import { Auth2Guard } from "src/guards/auth2.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor (private readonly orderService : OrderService){}

    @Post()
    @UseGuards(Auth2Guard)
    addOrder(@Body() order: CreateOrderDto){
        const {userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @Get(':id')
    @UseGuards(Auth2Guard)
    getOrder(@Param('id', ParseUUIDPipe) id : string) {
        return this.orderService.getOrder(id);
    }
}