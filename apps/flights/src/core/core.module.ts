import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationOptions } from '../common/applicationOptions.interface';

@Module({})
export class CoreModule {
    static forRoot(options: ApplicationOptions) {

        const imports = options.persistenceDriver === 'orm' ? [
            TypeOrmModule.forRootAsync({
                useFactory: (configService: ConfigService) => ({
                    type: 'postgres',
                    host: configService.get<string>('db.host'),
                    port: configService.get<number>('db.port'),
                    username: configService.get<string>('db.user'),
                    password: configService.get<string>('db.password'),
                    database: configService.get<string>('db.database'),
                    // entities: [SeatEntity],
                    synchronize: true,
                    autoLoadEntities: true
                }),
                inject: [ConfigService]
            })
        ] : [];
        console.log('llego aqui?',)

        return {
            module: CoreModule,
            imports,
        }
    }
}
