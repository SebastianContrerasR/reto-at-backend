import {
  Body,
  Controller,
  GoneException,
  Inject,
  InternalServerErrorException,
  Post
} from '@nestjs/common';
import { SeatsAlreadyBookedError } from '../../exceptions/seats_already_booked.error';
import { TicketServiceInterface } from '../../services/ticket.service.interface';
import { CreateTicketDto } from './dtos/create-ticket-dto';

@Controller('tickets')
export class CreateTicketController {
  constructor(
    @Inject('ticket-service')
    private readonly service: TicketServiceInterface,
  ) { }

  @Post('')
  async createTicket(@Body() body: CreateTicketDto) {
    try {
      await this.service.createTicket(body);
    } catch (error) {
      if (error instanceof SeatsAlreadyBookedError) {
        throw new GoneException({ message: error.message });
      }
      throw new InternalServerErrorException({ message: error });
    }
  }
}
