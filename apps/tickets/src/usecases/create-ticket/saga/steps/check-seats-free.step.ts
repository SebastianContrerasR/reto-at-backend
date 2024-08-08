import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'apps/tickets/src/config';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { SeatsAlreadyBookedError } from 'apps/tickets/src/exceptions/seats_already_booked.error';
import { lastValueFrom } from 'rxjs';
import { Step } from './step';

@Injectable()
export class CheckSeatsFreeStep extends Step<Ticket, void> {
  private readonly topic = 'check.seats.free';

  constructor(
    @Inject(config().services.flights.name)
    private flightsClient: ClientKafka,
  ) {
    super();
    this.name = 'Check Seats Free Step';
  }

  async invoke(ticket: Ticket): Promise<void> {
    const { success, error } = await lastValueFrom(
      this.flightsClient.send<{ success: boolean, error?: string }>(this.topic, {
        flightId: ticket.flightId,
        seatsCode: ticket.ticketItems.map((item) => item.seatCode),
      }),
    );
    console.log(this.name, ' Response: ', success, typeof success);

    if (!success) {
      throw new SeatsAlreadyBookedError(error || 'Seats already booked');
    }
  }

  withCompenstation(ticket: Ticket): Promise<any> {
    return;
  }

  async onModuleInit() {
    this.flightsClient.subscribeToResponseOf(this.topic);
    await this.flightsClient.connect();
  }
}
