import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './orders.dto';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(): Promise<Array<OrderDto>> {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(@Body() orderDto: OrderDto): Promise<OrderDto> {
      try {
        return this.ordersService.createOrder(orderDto);
      } catch (err) {
        throw err;
      }
  }
}
