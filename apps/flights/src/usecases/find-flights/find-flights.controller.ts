import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FlightServiceInterface } from '../../services/flight/flight.service.interface';

@Controller()
export class FindFlightsController {
  constructor(
    @Inject('flight-service')
    private readonly service: FlightServiceInterface,
  ) { }

  @MessagePattern('flights.flights.find-all')
  findAll() {
    console.info('Flights Service: Find all flights');
    return this.service.findAll();
  }
}
