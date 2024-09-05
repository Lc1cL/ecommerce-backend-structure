import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/entities/products.entity";


export class CreateOrderDto {
    
    @IsUUID()
    @IsNotEmpty()
    userId : string;


    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>
}