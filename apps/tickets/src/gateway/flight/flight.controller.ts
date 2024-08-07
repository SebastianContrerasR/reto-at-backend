import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Res } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import config from '../../config';
import { CreateFlightDto } from './dtos/create-flight-dto';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';

@Controller('flights')
export class FlightsController {
    constructor(
        @Inject(config().services.flights.name)
        private flightsClient: ClientKafka,
    ) { }

    @Post()
    async create(@Body() dto: CreateFlightDto, @Res() res: Response) {
        console.info('Flights Service: Create flight');

        const success = await lastValueFrom(
            this.flightsClient.send('flights.flights.create', dto),
        );

        console.info(success);
        if (!success) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Flight creation failed',
            });
        }

        return res.status(HttpStatus.CREATED).json({
            message: 'Flight created successfully',
        });
    }

    @Get()
    async findAll() {
        console.info('Flights Service: Find all flights');

        return await lastValueFrom(
            this.flightsClient.send('flights.flights.find-all', ''),
        );

    }
    @Get(':id/details')
    async findByIdDetails(@Res() res: Response, @Param('id') id: string) {
        console.info('Flights Service: Find flight by id Details');

        const flight = await lastValueFrom(
            this.flightsClient.send('flights.flights.find-by-id-details', { id }),
        );

        console.info(flight);
        if (!flight?.[0]) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Flight not found',
            });
        }
        return res.status(HttpStatus.OK).json(flight[0]);
    }

    async onModuleInit() {
        this.flightsClient.subscribeToResponseOf('flights.flights.create');
        this.flightsClient.subscribeToResponseOf('flights.flights.find-all');
        this.flightsClient.subscribeToResponseOf('flights.flights.find-by-id-details');

        await this.flightsClient.connect();
    }
}
