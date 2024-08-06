import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SeatServiceInterface } from '../../services/seat.service.interface';

type ReserveSeatsMessage = {
  flightId: string;
  seatsId: string[];
};

@Controller()
export class UpdateStockController {
  constructor(
    @Inject('seats-service')
    private readonly service: SeatServiceInterface,
  ) { }

  @MessagePattern('flights.seats.reserve')
  reduceStockQuantity(@Payload() message: ReserveSeatsMessage) {
    console.info('Flights Service: Reserve seats');

    this.service.reserveSeats(message.flightId, message.seatsId);
    return {
      success: true,
    };
  }

  @MessagePattern('flights.seats.free')
  restockQuantity(@Payload() message: ReserveSeatsMessage) {
    console.info('Inventory Service: restock quantity');

    this.service.freeUpSeats(message.flightId, message.seatsId);

    return {
      success: true,
    };
  }
}
