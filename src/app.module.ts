import { MiddlewareConsumer, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesRepository } from './categories/categories.repository';
import { ProductRepository } from './product/product.repository';
import { Categories } from './entities/categories.entity';
import { Product } from './entities/products.entity';
import { Order } from './entities/orders.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      // este es asíncrono porque va a estar cargando variables de entorno entonces hay que esperar la respuesta para que no rompa
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    ProductModule,
    AuthModule,
    CategoriesModule,
    OrdersModule,
    FileUploadModule,
    // TypeOrmModule.forFeature([Product, User, Categories, Order, OrderDetails]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([Categories, Product, Order])
  ],
  controllers: [AppController],
  providers: [AppService, CategoriesRepository, ProductRepository],
})
export class AppModule implements OnModuleInit {
  constructor( private readonly categoriesRepository: CategoriesRepository,
    private readonly productRepository: ProductRepository,
  ){}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
  
  async onModuleInit() {
      await this.seedCategories()
      await this.seedProducts();
  }

  async seedCategories() {
      await this.categoriesRepository.addCategories();
  }

  async seedProducts(){
    await this.productRepository.addProduct();
  }
}
