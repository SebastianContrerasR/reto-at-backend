import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightServiceInterface } from '../../services/flight/flight.service.interface';

type CreateFlightMessage = {
  departure: string;
  arrival: string;
  departureDate: Date;
  arrivalDate: Date;
  nroSeats: number;
  priceSeats: number;
};

@Controller()
export class CreateFlightsController {
  constructor(
    @Inject('flight-service')
    private readonly service: FlightServiceInterface,
  ) { }

  @MessagePattern('flights.flights.create')
  create(@Payload() message: CreateFlightMessage) {
    console.info('Flights Service: Create flights');
    try {

      this.service.create(message);
      return true;
    } catch (error) {
      return false;
    }
  }
}
