import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from 'apps/tickets/src/config';
import { Ticket } from 'apps/tickets/src/entities/ticket';
import { ReserveSeatsError } from 'apps/tickets/src/exceptions/reserve_seats.error';
import { lastValueFrom } from 'rxjs';
import { Step } from './step';

@Injectable()
export class ReserveSeatsStep extends Step<Ticket, void> {
  constructor(
    @Inject(config().services.flights.name)
    private flightsClient: ClientKafka,
  ) {
    super();
    this.name = 'Reserve Seats Step';
  }

  async invoke(ticket: Ticket): Promise<any> {
    const { success, error } = await lastValueFrom(
      this.flightsClient.send<{ success: boolean, error?: string }>('flights.seats.reserve', {
        flightId: ticket.flightId,
        seatsId: ticket.ticketItems.map((item) => item.seatCode),
      }),
    );
    console.log(this.name, ' Response: ', success, typeof success);

    if (!success) {
      throw new ReserveSeatsError(error);
    }
  }

  async withCompenstation(ticket: Ticket): Promise<any> {
    const { success, error } = await lastValueFrom(
      this.flightsClient.send<{ success: boolean, error?: string }>('flights.seats.free', {
        flightId: ticket.flightId,
        seatsId: ticket.ticketItems.map((item) => item.seatCode),
      }),
    );

    if (!success) {
      throw new Error(error);
    }
  }

  async onModuleInit() {
    this.flightsClient.subscribeToResponseOf('flights.seats.reserve');
    this.flightsClient.subscribeToResponseOf('flights.seats.free');

    await this.flightsClient.connect();
  }
}
