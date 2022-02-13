import { Module } from '@nestjs/common';
import { DatabaseService } from '../DB/database.service';
import { CpfValidator } from 'src/helpers/cpfValidator';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [CpfValidator, DatabaseService, OrdersService],
})
export class OrdersModule {}
