import { Flight } from "../../entities/flight";

export interface CreateFlight {
  departure: string;
  arrival: string;
  departureDate: Date;
  arrivalDate: Date;
  nroSeats: number;
  priceSeats: number;
}

export interface FlightServiceInterface {
  create(createFlight: CreateFlight): Promise<void>;
  findAll(): Promise<Flight[]>;
  findById(flightId: string): Promise<Flight>;
  findByIdDetails(flightId: string): Promise<Flight>;
}
