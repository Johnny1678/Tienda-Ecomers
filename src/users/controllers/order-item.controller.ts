import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from '../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateOrderItemDto,
  ) {
    return this.orderItemService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderItemService.delete(id);
  }
}
