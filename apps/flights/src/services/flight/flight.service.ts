import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../../entities/flight';
import { Seat, SeatStatus } from '../../entities/seat';
import { CreateFlight, FlightServiceInterface } from './flight.service.interface';
import { randomUUID } from 'crypto';

export class FlightService implements FlightServiceInterface {

  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) { }

  async create(createFlight: CreateFlight): Promise<void> {
    const flight = new Flight();
    flight.id = randomUUID();
    flight.departure = createFlight.departure;
    flight.arrival = createFlight.arrival;
    flight.departureDate = createFlight.departureDate;
    flight.arrivalDate = createFlight.arrivalDate;
    flight.seats = [];

    for (let i = 0; i < createFlight.nroSeats; i++) {
      const seat = new Seat();
      seat.id = randomUUID();
      seat.code = `SEAT${i + 1}`;
      seat.price = createFlight.priceSeats;
      seat.status = SeatStatus.FREE;
      flight.seats.push(seat);
    }
    console.info(flight);
    await this.flightRepository.save(flight);

    return;
  }

  async findAll(): Promise<Flight[]> {
    return await this.flightRepository.find();
  }

  async findById(id: string): Promise<Flight> {
    return await this.flightRepository.findOne(
      {
        where: {
          id,
        },
        relations: ['seats'],
      }
    );
  }

}
