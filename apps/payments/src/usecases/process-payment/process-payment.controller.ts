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
  async process(@Payload() message: AuthorizePaymentMessage) {
    console.info('Payments Service: Process payment', message);

    try {

      await this.paymentService.processPayment(message.ticketId, message.amount);
      return { success: true };
    } catch (error) {

      return { success: false, error: error.message };
    }
  }

  @MessagePattern('payments.payment.cancel')
  async cancel(@Payload() message: CancelPaymentMessage) {
    console.info('Payments Service: Cancel payment', message);
    try {

      await this.paymentService.cancelPayment(message.ticketId);
      return { success: true };
    } catch (error) {

      return { success: false, error: error.message };
    }

  }
}
