import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentServiceInterface } from '../../services/payment.service.interface';

type AuthorizePaymentMessage = {
  ticketId: string;
  amount: number;
};

type CancelPaymentMessage = {
  ticketId: string;
};
@Controller()
export class ProcessPaymentController {
  constructor(
    @Inject('payment-service') private paymentService: PaymentServiceInterface,
  ) { }

  @MessagePattern('payments.payment.process')
  process(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payments Service: Process payment');
    return this.paymentService.processPayment(message.ticketId, message.amount);
  }

  @MessagePattern('payments.payment.cancel')
  cancel(@Payload() message: CancelPaymentMessage) {
    console.info('Payments Service: Cancel payment');

    return this.paymentService.cancelPayment(message.ticketId);
  }
}
