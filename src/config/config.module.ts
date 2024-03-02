import { Global, Module } from '@nestjs/common';

import { ConfigService } from './config.service';

//config module global setup
@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule { }
