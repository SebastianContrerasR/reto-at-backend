import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { CheckSeatsFreeStep } from './steps/check-seats-free.step';
import { CreateTicketStep } from './steps/create-ticket.step';
import { ProcessPaymentStep } from './steps/process-payment.step';
import { Step } from './steps/step';
import { ConfirmTicketStep } from './steps/confirm-ticket.step';
import { ReserveSeatsStep } from './steps/reserve-seats.step';

@Injectable()
export class CreateTicketSaga {
  private steps: Step<Ticket, void>[] = [];
  private successfulSteps: Step<Ticket, void>[] = [];

  constructor(
    @Inject('create-ticket-step') step1: CreateTicketStep,
    @Inject('check-seats-free') step2: CheckSeatsFreeStep,
    @Inject('reserve-seats') step3: ReserveSeatsStep,
    @Inject('process-payment') step4: ProcessPaymentStep,
    @Inject('confirm-ticket') step5: ConfirmTicketStep,
  ) {
    this.steps = [step1, step2, step3, step4, step5];
  }

  async execute(ticket: Ticket): Promise<void> {
    for (const step of this.steps) {
      try {
        console.info(`Invoking: ${step.name} step...`);
        await step.invoke(ticket);
        this.successfulSteps.unshift(step);
      } catch (error) {
        console.error(`Failed Step: ${step.name} !!`);
        this.successfulSteps.forEach(async (s) => {
          console.info(`Rollbacking: ${s.name} ...`);
          await s.withCompenstation(ticket);
        });
        throw error;
      }
    }
    console.info('Ticket Creation Transaction ended successfuly');
  }
}
