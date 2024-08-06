import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { SeatServiceInterface } from '../../services/seat.service.interface';

type CheckSeatsFreeMessage = {
  flightId: string;
  seatsId: string[];
};

@Controller()
export class CheckProductAvailibityController {
  constructor(
    @Inject('seats-service')
    private readonly service: SeatServiceInterface,
  ) { }

  @MessagePattern('check.seats.free')
  checkSeatsFree(@Payload() message: CheckSeatsFreeMessage) {
    return this.service.checkSeatsFree(message.flightId, message.seatsId);
  }
}
