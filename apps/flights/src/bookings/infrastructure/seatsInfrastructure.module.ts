import { Module } from "@nestjs/common";
import { OrmPersistenceModule } from "./persistence/orm/orm-persistence.module";

@Module({})
export class SeatsInfrastructureModule {
    static use() {
        const persistenceModule = OrmPersistenceModule;
        return {
            module: SeatsInfrastructureModule,
            imports: [persistenceModule],
            exports: [persistenceModule],
        }
    }
}