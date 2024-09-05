import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = this.productRepository.findOneBy({ id: productId });

    if (!product) {
      return new NotFoundException(`Product with id ${productId} not found`);
    }

    const response = await this.fileUploadRepository.uploadImage(file);

    if (!response.secure_url) {
      return new Error(`Error while uploading to cloudinary`);
    }

    const result = await this.productRepository.update(productId, {
      imgUrl: response.secure_url,
    });

    if (result.affected === 0) {
      return new Error(`Error while updating products url Image`);
    }

    return this.productRepository.findOneBy({ id: productId });;
  }
}
