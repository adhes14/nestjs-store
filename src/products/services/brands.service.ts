import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '../entities/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandsRepo: Repository<Brand>) {}

  findAll() {
    return this.brandsRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandsRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!brand) throw new NotFoundException(`Brand #${id} not found`);
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandsRepo.create(data);
    return this.brandsRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandsRepo.merge(brand, changes);
    return this.brandsRepo.save(brand);
  }

  remove(id: number) {
    return this.brandsRepo.delete(id);
  }
}
