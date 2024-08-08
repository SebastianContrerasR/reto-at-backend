export interface SeatServiceInterface {
  checkSeatsFree(flightId: string, seatsCode: string[]): Promise<boolean>;
  reserveSeats(flightId: string, seatsCode: string[]): Promise<void>;
  freeUpSeats(flightId: string, seatsCode: string[]): Promise<void>;
}
