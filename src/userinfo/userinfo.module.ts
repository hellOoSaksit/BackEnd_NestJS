import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_userinfo} from'./entities/userinfo.entity'
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
@Module({
  imports:[TypeOrmModule.forFeature([DB_userinfo])],
  controllers: [UserinfoController],
  providers: [UserinfoService , JwtStrategy],
  exports:[UserinfoService],
})
export class UserinfoModule {}
