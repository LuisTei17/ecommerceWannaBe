import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/DB/database.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [],
  controllers: [OrdersController],
  providers: [DatabaseService, OrdersService],
})
export class OrdersModule {}
