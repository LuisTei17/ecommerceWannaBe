export class OrderDto {
    description: string;
    price: number;
    quantity: number;
    clientCpf: string;
    cupom: number;
    finalPrice?: number;
  }