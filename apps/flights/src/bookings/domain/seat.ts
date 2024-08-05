import { SeatStatus } from "./valueObjects/seatStatus";

export class Seat {
    constructor(
        public id: string,
        public code: string,
        public price: number,
        public status: SeatStatus,
        public idFlight: string,
    ) { }

    isFree(): boolean {
        return this.status.value === 'free';
    }
}