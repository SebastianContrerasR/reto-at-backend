import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'apps/tickets/src/config';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { PaymentNotSuccessfulError } from 'apps/tickets/src/exceptions/payment_not_successful';
import { lastValueFrom } from 'rxjs';
import { Step } from './step';

@Injectable()
export class ProcessPaymentStep extends Step<Ticket, void> {
  constructor(
    @Inject(config().services.payments.name) private paymentClient: ClientKafka,
  ) {
    super();
    this.name = 'Process Payment Step';
  }

  async invoke(ticket: Ticket): Promise<any> {
    const success = await lastValueFrom(
      this.paymentClient.send('payments.payment.process', {
        ticketId: ticket.id,
        amount: ticket.ticketItems.reduce((accumulator: number, item) => {
          return accumulator + item.price;
        }, 0),
      }),
    );

    if (!success) {
      throw new PaymentNotSuccessfulError('The payment unsuccessful');
    }
  }

  async withCompenstation(ticket: Ticket): Promise<any> {
    await lastValueFrom(
      this.paymentClient.send('payments.payment.cancel', {
        ticketId: ticket.id,
      }),
    );
  }

  async onModuleInit() {
    this.paymentClient.subscribeToResponseOf('payments.payment.process');
    this.paymentClient.subscribeToResponseOf('payments.payment.cancel');

    await this.paymentClient.connect();
  }
}
