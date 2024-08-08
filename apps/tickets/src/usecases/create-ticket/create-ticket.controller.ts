import {
  Body,
  Controller,
  GoneException,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards
} from '@nestjs/common';
import { SeatsAlreadyBookedError } from '../../exceptions/seats_already_booked.error';
import { TicketServiceInterface } from '../../services/ticket.service.interface';
import { CreateTicketDto } from './dtos/create-ticket-dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthUser, AuthUserType } from '../../decorator/auth-user.decorator';

@Controller('tickets')
export class CreateTicketController {
  constructor(
    @Inject('ticket-service')
    private readonly service: TicketServiceInterface,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  async createTicket(@Body() body: CreateTicketDto, @AuthUser() user: AuthUserType) {
    try {
      await this.service.createTicket(body, user.id);
    } catch (error) {
      if (error instanceof SeatsAlreadyBookedError) {
        throw new GoneException({ message: error.message });
      }
      throw new InternalServerErrorException({ message: error });
    }
  }
}
