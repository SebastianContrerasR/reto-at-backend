export interface SeatServiceInterface {
  checkSeatsFree(flightId: string, seatsId: string[]): Promise<boolean>;
  reserveSeats(flightId: string, seatsId: string[]): Promise<void>;
  freeUpSeats(flightId: string, seatsId: string[]): Promise<void>;
}
