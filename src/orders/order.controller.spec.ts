import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../DB/database.service';
import { CpfValidator } from '../helpers/cpfValidator';

describe('OrdersController', () => {
  let ordersController: OrdersController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [OrdersController],
        providers: [CpfValidator, DatabaseService, OrdersService],
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
                "price": 233,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 0
            }

            const orderToTest = {
                "description": "Caixa de som",
                "price": 233,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 0,
                "finalPrice": 233
            }
            ordersController.createOrder(orderToCreate)
                .then((order => {
                    expect(order).toStrictEqual(orderToTest);
                }))
        });

        it('should create a order with discount', () => {
            const orderToCreate = {
                "description": "Caixa de som",
                "price": 230,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 10
            }

            const orderToTest = {
                "description": "Caixa de som",
                "price": 230,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 10,
                "finalPrice": 207
            }
            ordersController.createOrder(orderToCreate)
                .then((order => {
                    expect(order).toStrictEqual(orderToTest);
                }))
        });

        it('should not create order with Invalid CPF', () => {
            const orderToCreate = {
                "description": "Caixa de som",
                "price": 233,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 0
            }

            const orderToTest = {
                "description": "Caixa de som",
                "price": 233,
                "quantity": 1,
                "clientCpf": "03756266036",
                "cupom": 0,
                "finalPrice": 233
            }
            ordersController.createOrder(orderToCreate)
                .then((order => {
                    console.log(order)
                    expect(order).not.toStrictEqual(orderToTest);
                }))
        });
    });

});
