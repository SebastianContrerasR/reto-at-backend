import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment';
import { PaymentServiceInterface } from './payment.service.interface';

export class PaymentService implements PaymentServiceInterface {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) { }
  async processPayment(ticketId: string, amount: number): Promise<boolean> {

    try {
      const payment = new Payment();
      payment.ticketId = ticketId;
      payment.amount = amount;
      payment.paymentDate = new Date();
      payment.authorize();
      await this.paymentRepository.save(payment);
      return true
    } catch (error) {
      return false;
    }
  }

  async cancelPayment(ticketId: string): Promise<void> {

    const payment = await this.paymentRepository.findOneBy({ ticketId: ticketId });
    if (!payment) return;
    payment.cancel()
    this.paymentRepository.save(payment)

    return;
  }
}
