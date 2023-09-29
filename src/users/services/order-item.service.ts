import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.itemRepo.find();
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.itemRepo.findOne({ where: { id } });
    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      item.product = product;
    }
    if (changes.quantity) {
      item.quantity = changes.quantity;
    }
    return this.itemRepo.save(item);
  }

  async delete(id: number) {
    const item = await this.itemRepo.findOne({ where: { id } });
    return this.itemRepo.remove(item);
  }
}
