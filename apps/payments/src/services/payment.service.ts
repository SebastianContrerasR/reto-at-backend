import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment';
import { PaymentServiceInterface } from './payment.service.interface';

export class PaymentService implements PaymentServiceInterface {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) { }
  async processPayment(ticketId: string, amount: number): Promise<void> {
    if (amount > 200) {
      throw new Error('Amount is too high');
    }

    const payment = new Payment();
    payment.id = randomUUID();
    payment.ticketId = ticketId;
    payment.amount = amount;
    payment.paymentDate = new Date();
    payment.authorize();
    await this.paymentRepository.save(payment);
  }

  async cancelPayment(ticketId: string): Promise<void> {

    const payment = await this.paymentRepository.findOneBy({ ticketId: ticketId });
    if (!payment) throw new Error('Payment not found');
    payment.cancel()
    await this.paymentRepository.update({
      id: payment.id,
    }, {
      status: payment.status
    });
  }
}
