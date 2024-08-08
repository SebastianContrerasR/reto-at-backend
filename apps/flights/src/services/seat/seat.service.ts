import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Seat, SeatStatus } from '../../entities/seat';
import { SeatServiceInterface } from './seat.service.interface';

export class SeatService implements SeatServiceInterface {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) { }

  async checkSeatsFree(flightId: string, seatsCode: string[]): Promise<boolean> {

    const seats = await this.seatRepository.find({
      where: {
        flight: {
          id: flightId,
        },
        code: In(seatsCode),
      }
    });

    if (seats.length !== seatsCode.length) {
      throw new Error('Seats not found');
    }

    return seats.every((seat) =>
      seat.isFree(),
    );
  }

  async reserveSeats(flightId: string, seatsCode: string[]): Promise<void> {
    const seats = await this.seatRepository.find({
      where: {
        code: In(seatsCode),
        flight: {
          id: flightId,
        },
      }
    });

    if (seats.length !== seatsCode.length) {
      throw new Error('Seats not found');
    }

    await this.seatRepository.update({
      id: In(seats.map((seat) => seat.id)),
    }, {
      status: SeatStatus.BOOKED,
    });
  }

  async freeUpSeats(flightId: string, seatsCode: string[]): Promise<void> {

    const seats = await this.seatRepository.find({
      where: {
        code: In(seatsCode),
        flight: {
          id: flightId,
        },
      }
    });

    if (seats.length !== seatsCode.length) {
      throw new Error('Seats not found');
    }

    await this.seatRepository.update({
      id: In(seats.map((seat) => seat.id)),
    }, {
      status: SeatStatus.FREE,
    });

  }

}
