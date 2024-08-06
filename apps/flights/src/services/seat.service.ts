import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Seat, SeatStatus } from '../entities/seat';
import { SeatServiceInterface } from './seat.service.interface';

export class SeatService implements SeatServiceInterface {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) { }

  async checkSeatsFree(flightId: string, seatsId: string[]): Promise<boolean> {

    const seats = await this.seatRepository.find({
      where: {
        flight: {
          id: flightId,
        },
        id: In(seatsId),
      }
    });

    if (seats.length !== seatsId.length) {
      return false;
    }

    return seats.every((seat) =>
      seat.isFree(),
    );
  }

  async reserveSeats(flightId: string, seatsId: string[]): Promise<void> {
    await this.seatRepository.update({
      id: In(seatsId),
      flight: {
        id: flightId,
      },
    }, {
      status: SeatStatus.BOOKED,
    });
  }

  async freeUpSeats(flightId: string, seatsId: string[]): Promise<void> {
    await this.seatRepository.update({
      id: In(seatsId),
      flight: {
        id: flightId,
      },
    }, {
      status: SeatStatus.FREE,
    });
  }

}
