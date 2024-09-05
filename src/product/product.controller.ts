import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, UseGuards, Query, ParseUUIDPipe } from "@nestjs/common";
import { ProductsService } from "./product.service";
import { Product } from "../entities/products.entity";
import { Auth2Guard } from "src/guards/auth2.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Products')
@Controller ('products')
export class ProductsController {
    constructor (private readonly productsService: ProductsService){}
    
    @HttpCode(200)
    @Get()
    getProducts(@Query('page') page:string, @Query('limit') limit:string){
        return this.productsService.getProducts(Number(page),Number(limit))
    }

    @HttpCode(201)
    @Get('seeder')
    addProducts() {
        return this.productsService.addProduct();
    }

    @HttpCode(200)
    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id : string){
        return this.productsService.getProductById(id)
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(Auth2Guard, RolesGuard)
    UpdateProduct(@Param('id', ParseUUIDPipe) id:string, @Body() product : Partial<Product>){
        return this.productsService.updateProduct(id, product);
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(Auth2Guard, RolesGuard)
    DeleteProduct(@Param('id', ParseUUIDPipe) id : string){
            return this.productsService.deleteProductById(id)
    }

    @ApiBearerAuth()
    @Delete()
    @Roles(Role.Admin)
    @UseGuards(Auth2Guard, RolesGuard)
    DeletProducts(){
        return this.productsService.deleteProducts()
    }
}