import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserinfoModule } from './userinfo/userinfo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from './auth/auth.module';


@Module({
  // imports: [UserinfoModule],
  imports:[
    ConfigModule.forRoot({
      cache:true,
      isGlobal: true,
      envFilePath: '.env'
    }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          // console.log(configService.get<string>('DB_HOST'))
          return {
            type: 'postgres', 
            host: configService.get<string>('DB_HOST'), 
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            synchronize: true, 
            // logging: true,
            autoLoadEntities: true,
          };
        },
      }),UserinfoModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
