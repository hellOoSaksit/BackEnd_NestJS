
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserinfoService } from '../userinfo/userinfo.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { console } from 'inspector';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserinfoService,
    private jwtService: JwtService
  ) {}

  async validateUser(uid: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(uid);
    if (user && (await bcrypt.compare(pass, user.password))) {
      return {
        uuid: user.uuid,
        email: user.email,
        role: user.role,
        phone: user.phone,
      }
    }
  }

  async login(user: any) {
    const payload = { email: user.email, uuid: user.uuid, role: user.role , phone: user.phone };
    return {
      access_token: this.jwtService.sign(payload)
    };
}

  async logout(user: any) {
    return { message: 'Logged out successfully' };
  }
}
