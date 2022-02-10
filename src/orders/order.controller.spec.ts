import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../DB/database.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [OrdersController],
        providers: [DatabaseService, OrdersService],
        }).compile();

        ordersController = app.get<OrdersController>(OrdersController);
    });

    describe('Orders', () => {
        it('should return created orders', () => {
        ordersController.getOrders()
            .then(orders => {
                expect(Array.isArray(orders)).toBe(true);
            })
        });

        it('should create a order', () => {
            const orderToCreate = {
                "description": "Caixa de som",
                "price": 233.34,
                "quantity": 1,
                "clientCpf": "031731731",
                "cupom": "AB10OFF"
            }

            const orderToTest = {
                "description": "Caixa de som",
                "price": 233.34,
                "quantity": 1,
                "clientCpf": "031731731",
                "cupom": "AB10OFF"
            }
            ordersController.createOrder(orderToCreate)
                .then((order => {
                    expect(order).toStrictEqual(orderToTest);
                }))
        });
    });

});
