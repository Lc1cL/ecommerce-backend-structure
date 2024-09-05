import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { OrderDetails } from 'src/entities/orderDetails.entity';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRespository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addOrder(userId: string, products: Product[]) {
    let total = 0;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`)
    }

    const order = new Order();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.orderRespository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        console.log(`Searching for product with id: ${element.id}`);
        const product = await this.productRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new NotFoundException(`Product with id ${element.id} not found`);
        }

        console.log(`Product found: ${product.name}, price: ${product.price}`);
        total += Number(product.price);

        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    console.log(`Total price calculated: ${total}`);

    const orderDetail = new OrderDetails();

    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;

    const newOrderDetail = await this.orderDetailsRepository.save(orderDetail);
    newOrder.orderDetails = newOrderDetail;
    await this.orderRespository.save(newOrder);

    return await this.orderRespository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string) {
    const order = await this.orderRespository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

}
