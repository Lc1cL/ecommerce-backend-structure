import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/entities/categories.entity';
import * as data from '../utils/data.json';
import { Order } from 'src/entities/orders.entity';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getById(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async addProduct() {
    const categories = await this.categoriesRepository.find();
    for (const element of data) {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      if (category) {
        const newProduct = new Product();
        newProduct.name = element.name;
        newProduct.description = element.description;
        newProduct.price = element.price;
        newProduct.imgUrl = element.imgUrl;
        newProduct.stock = element.stock;
        newProduct.category = category;

        await this.productRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(newProduct)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      } else {
        console.error(
          `Category ${element.category} not found for product ${element.name}`,
        );
      }
    }
    return 'Product(s) added successfully';
  }

  async updateProduct(id: string, product: Partial<Product>) {
    try {
      const existingProduct = await this.productRepository.findOneBy({ id });
      if (!existingProduct) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.productRepository.update(existingProduct, product);

      const updatedProduct = await this.productRepository.findOneBy({ id });
      return updatedProduct;
    } catch (error) {
      console.error(`Failed to update product with id ${id}: ${error.message}`);
      throw new Error(`Failed to update product with id ${id}`);
    }
  }

  async deleteById(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`No product was found with id ${id}`);
      } else {
        await this.productRepository.delete({ id });
        return `Product with id ${id} was deleted successfully`;
      }
    } catch (error) {
      console.log(
        `An error has ocurred while deletting the product with id: ${id}`,
      );
      return new Error(
        `An error has ocurred while deletting the product with id ${id}`,
      );
    }
  }

  async deleteProducts() {
    try {
      const products = await this.productRepository.find();

      if (!products || products.length === 0) {
        return 'There are no existing products loaded at the moment';
      }

      const orders = await this.orderRepository.find();

      if (orders && orders.length > 0) {
        throw new MethodNotAllowedException(
          'An order is in progress. Product deletion is not allowed at this time',
        );
      }

      const deletePromises = products.map((product) =>
        this.deleteById(product.id),
      );
      await Promise.all(deletePromises);

      return 'Products deleted successfully';
    } catch (error) {
      if (error instanceof MethodNotAllowedException) {
        return;
      }

      throw new Error(
        'An error occurred while deleting products: ' + error.message,
      );
    }
  }
}
