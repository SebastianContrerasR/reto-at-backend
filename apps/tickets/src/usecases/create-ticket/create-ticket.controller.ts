import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import { AuthUser, AuthUserType } from '../../decorator/auth-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import { TicketServiceInterface } from '../../services/ticket.service.interface';
import { CreateTicketDto } from './dtos/create-ticket-dto';
import { SeatsAlreadyBookedError } from '../../exceptions/seats_already_booked.error';
import { PaymentNotSuccessfulError } from '../../exceptions/payment_not_successful';
import { ReserveSeatsError } from '../../exceptions/reserve_seats.error';

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
      if (
        error instanceof SeatsAlreadyBookedError ||
        error instanceof PaymentNotSuccessfulError ||
        error instanceof ReserveSeatsError
      ) {
        throw new UnprocessableEntityException({ message: error.message });
      }
      throw new InternalServerErrorException({ message: error.message });
    }
  }
}
