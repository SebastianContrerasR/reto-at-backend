import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { SeatServiceInterface } from '../../services/seat/seat.service.interface';

type CheckSeatsFreeMessage = {
  flightId: string;
  seatsCode: string[];
};

@Controller()
export class CheckSeatsFreeController {
  constructor(
    @Inject('seats-service')
    private readonly service: SeatServiceInterface,
  ) { }

  @MessagePattern('check.seats.free')
  checkSeatsFree(@Payload() message: CheckSeatsFreeMessage) {
    console.info('Flights Service: Check seats free');
    return this.service.checkSeatsFree(message.flightId, message.seatsCode);
  }
}
