import { Inject, Injectable, Logger } from '@nestjs/common';
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
    const successfulSteps: Step<Ticket, void>[] = [];
    for (const step of this.steps) {
      try {

        Logger.log(`Current step: ${step.name} step`);
        await step.invoke(ticket);
        successfulSteps.unshift(step);
      } catch (error) {

        Logger.error(`Failed Step: ${step.name}`);

        successfulSteps.forEach(async (s) => {

          Logger.log(`Rollbacking: ${s.name}`);
          await s.withCompenstation(ticket);
        });

        throw error;
      }
    }
    Logger.log('Ticket Creation Transaction ended successfuly');
  }
}
