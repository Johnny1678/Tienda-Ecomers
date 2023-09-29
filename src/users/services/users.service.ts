//src/user/services/user.service
import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from "./customers.service";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @Inject(forwardRef(() => ProductsService))
    private productsService: ProductsService,
    private customerService: CustomersService,
  ) {}

  async findAll() {
    return await this.userRepo.find({
      relations: ['customer'] // esta
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['customer'] // Carga la relación 'customer'
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if(data.customerId){
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updateUser = this.userRepo.merge(user, changes);
    return this.userRepo.save(updateUser);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrderByUser(id: number){
    const user = await this.userRepo.findOneBy({ id: id });
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
