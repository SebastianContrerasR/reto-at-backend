import {
  Controller,
  Get,
  Inject,
  UseGuards
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import config from '../../config';
import { AuthUser, AuthUserType } from '../../decorator/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { TicketServiceInterface } from '../../services/ticket.service.interface';
import { FindTicketByUserIdResponseDto } from './dtos/find-ticket-by-userId.response.dto';

@Controller('tickets')
export class FindTicketsByUserIdController {
  constructor(
    @Inject('ticket-service')
    private readonly service: TicketServiceInterface,
    @Inject(config().services.flights.name)
    private flightsClient: ClientKafka,
  ) { }

  @UseGuards(AuthGuard)
  @Get('me')
  async findTicketsByUserId(@AuthUser() user: AuthUserType): Promise<FindTicketByUserIdResponseDto[]> {

    const tickets = await this.service.findTicketsByUserId(user.id);

    const ticketResponses = await Promise.all(tickets.map(async (ticket) => {

      const flight = await lastValueFrom(
        this.flightsClient.send('flights.flights.find-by-id', { id: ticket.flightId }),
      );

      const ticketResponse = new FindTicketByUserIdResponseDto(ticket, flight?.[0], user.name);
      return ticketResponse;
    }));

    return ticketResponses;
  }

  async onModuleInit() {
    this.flightsClient.subscribeToResponseOf('flights.flights.find-by-id');

    await this.flightsClient.connect();
  }

}
