import { Injectable } from '@nestjs/common';
import { OrderDto } from './orders.dto';
import { DatabaseService } from '../DB/database.service';
import { CpfValidator } from '../helpers/cpfValidator'

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService, private cpfValidator: CpfValidator) {}

  calculateDiscount(price, discount): number {
    const totalDiscount = (price * discount)/100;
    return price - totalDiscount;
  }

  async getOrders(): Promise<Array<OrderDto>> {
    return this.databaseService.getOrders();
  }

  async createOrder(order: OrderDto): Promise<OrderDto> {
    try {
      order.finalPrice = order.price;
      if (order.cupom)
        order.finalPrice = this.calculateDiscount(order.price, order.cupom)
      const isValidCpf = this.cpfValidator.validateCpf(order.clientCpf);
      if (!isValidCpf)
        throw new Error('Invalid CPF');
      return this.databaseService.insertOrder(order);
    } catch (err) {
      throw err;
    }
  }
}
