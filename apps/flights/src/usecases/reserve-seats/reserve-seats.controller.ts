import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SeatServiceInterface } from '../../services/seat/seat.service.interface';

type ReserveSeatsMessage = {
  flightId: string;
  seatsId: string[];
};

@Controller()
export class ReserveSeatsController {
  constructor(
    @Inject('seats-service')
    private readonly service: SeatServiceInterface,
  ) { }

  @MessagePattern('flights.seats.reserve')
  async reserveSeats(@Payload() message: ReserveSeatsMessage) {
    console.info('Flights Service: Reserve seats', message);

    try {

      await this.service.reserveSeats(message.flightId, message.seatsId);
      return { success: true };
    } catch (error) {

      return { success: false, error: error.message };
    }
  }

  @MessagePattern('flights.seats.free')
  async freeUpSeats(@Payload() message: ReserveSeatsMessage) {
    console.info('Flights Service: Free up seats', message);
    try {
      await this.service.freeUpSeats(message.flightId, message.seatsId);
      return { success: true };
    } catch (error) {

      return { success: false, error: error.message };
    }
  }
}
