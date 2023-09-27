//src/user/services/user.service
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

import { ProductsService } from './../../products/services/products.service';
import { CustomersService } from "./customers.service";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productsService: ProductsService,
    private customerService: CustomersService,
    private configService: ConfigService,
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

  async getOrderByUser(id: number): Promise<Order> {
    const user = await this.userRepo.findOneBy({ id: id });
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
