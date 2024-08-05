export class CreateBookingCommand {
    constructor(
        public readonly idUser: string,
        public readonly idSeats: string[],
    ) { }
}
