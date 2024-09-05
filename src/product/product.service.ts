import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { Product } from "../entities/products.entity";

@Injectable()
export class ProductsService {
    constructor(private productRepository: ProductRepository){}
    
    addProduct() {
        return this.productRepository.addProduct();
    }

    getProductById(id : string) {
        return this.productRepository.getById(id);
    }

    getProducts(page: number, limit: number) {
        return this.productRepository.getProducts(page, limit);
    }

    updateProduct(id: string, product: Partial<Product>){
        return this.productRepository.updateProduct(id, product)
    }

    deleteProductById(id: string) {
        return this.productRepository.deleteById(id);
    }
    deleteProducts(){
        return this.productRepository.deleteProducts();
    }
}