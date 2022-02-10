import { Injectable } from '@nestjs/common';
import { OrderDto } from './orders.dto';
import { DatabaseService } from '../DB/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getOrders(): Promise<Array<OrderDto>> {
    return this.databaseService.getOrders();
  }

  async createOrder(orderDto: OrderDto): Promise<OrderDto> {
    return this.databaseService.insertOrder(orderDto);
  }
}
