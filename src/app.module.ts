import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { ReviewModel } from './modules/review/review.module';
import { JwtMiddleware } from './config/jwt.middleware';

@Module({
  imports: [
    //JWT Register
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule,
    //Create MongoDB connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    UserModule,
    RestaurantModule,
    ReviewModel
  ],
  controllers: [AppController],
  providers: [AppService],
})
//For JWT middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'user/login', method: RequestMethod.POST },
      { path: 'user/create_user', method: RequestMethod.POST },
      { path: 'user/import_roles', method: RequestMethod.GET } ) 
      .forRoutes('*');
  }
}