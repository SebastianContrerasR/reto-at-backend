export class SeatStatus {
    constructor(readonly value: 'free' | 'booked' | 'paid') { }

    equals(other: SeatStatus): boolean {
        return this.value === other.value;
    }
}