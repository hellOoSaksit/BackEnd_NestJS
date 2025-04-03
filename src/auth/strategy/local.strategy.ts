
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email', passwordField: 'password'});
  }

  async validate(uid: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(uid, password);
    if (!user) {
      throw new InternalServerErrorException('Email or password is incorrect');
    }
    return user;
  }
}
