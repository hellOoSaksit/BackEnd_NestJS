import { Controller, UseGuards ,Request, Post, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    console.log('This login function is called');
    const accessToken = await this.authService.login(req.user);
    // Save to cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    return {
      message: 'Login successful',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}
