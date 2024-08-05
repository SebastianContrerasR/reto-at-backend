import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SeatStatus } from '../domain/valueObjects/seatStatus';
import { CreateBookingCommand } from './dto/create-booking.dto';
import { SeatRepository } from './ports/seat.repository';

@Injectable()
export class BookingService {
  constructor(
    private readonly seatRepository: SeatRepository,
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) { }

  async create(createBookingDto: CreateBookingCommand) {
    const seats = await Promise.all(
      createBookingDto.idSeats.map(async (seatId) => {
        const seat = await this.seatRepository.findById(seatId);

        if (!seat) {
          throw new Error(`Seat with id ${seatId} not found`);
        }

        if (!seat.isFree()) {
          throw new Error(`Seat with id ${seatId} is already booked`);
        }
        return seat;
      })
    );


    let amount = 0;
    // change status of seats to booked
    seats.forEach(async (seat) => {
      seat.status = new SeatStatus('booked');
      await this.seatRepository.save(seat);
      amount += seat.price;
    })

    this.kafkaClient.emit(
      'seats.booked',
      JSON.stringify({
        idUser: createBookingDto.idUser,
        amount: amount,
      })
    );
  }

  findAll() {
    return `This action returns all booking`;
  }
}
