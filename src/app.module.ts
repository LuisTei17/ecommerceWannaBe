import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './DB/database.module';

@Module({
  imports: [DatabaseModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
