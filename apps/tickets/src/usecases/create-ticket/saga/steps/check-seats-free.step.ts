import { Step } from './step';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import config from 'apps/tickets/src/config';
import { SeatsAlreadyBookedError } from 'apps/tickets/src/exceptions/seats_already_booked.error';

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
    const freeSeats = await lastValueFrom(
      this.flightsClient.send(this.topic, {
        flightId: ticket.flightId,
        seatsId: ticket.ticketItems.map((item) => ({
          id: item.seatCode,
        })),
      }),
    );

    if (!freeSeats) {
      throw new SeatsAlreadyBookedError(
        `Seats are already booked`,
      );
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
