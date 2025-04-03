
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(
        [
          (respornse) => {
            return respornse?.cookies?.accessToken?.access_token;
          }
        ]
      ),
      ignoreExpiration: false,
      //กรุณาใส่ secret key ที่ใช้ในการเข้ารหัส JWT ของตัวองใน ทั้งใน .env และ ค่าเดิมใน นี้
      secretOrKey: configService.get<string>('JWT_SECRET') || '1d6ba119a5951de65ae41e7e305c061ada2c86adc4ee4728ce4c3a442c5070f352614f43fd96decb00925bb47d18f1644ce85413af007d7c75730ca72c796ca7587c1f886f5d8c516a3a58a094b487fb54c5c291b488936288d650576fc167f08c36220749bd5724eecd4c969b8cbb61adbce1d479b48e4ec77d6e8aa0fba00f',
    });
  }

  async validate(payload: any) {
    return { 
      uuid: payload.uuid,
      phone: payload.phone,
      email: payload.email,
      role: payload.role,  
    };
  }
}
