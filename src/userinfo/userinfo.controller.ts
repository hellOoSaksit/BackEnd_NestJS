import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from './entities/userinfo.entity';
import { Roles } from './guards/roles.decorator';
import { RoleGuard } from './guards/auth.guard';
@Controller('userinfo')
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @Post('register')
  create(@Body() createUserinfoDto: CreateUserinfoDto) {
    return this.userinfoService.create(createUserinfoDto);
  }


  @UseGuards(JwtAuthGuard , RoleGuard)
  @Roles(Role.ADMIN)
  @Get('profile')
  async getProfile(@Request() req) {  
    return req.user;
  }

  @UseGuards(JwtAuthGuard , RoleGuard)
  @Roles(Role.ADMIN)
  @Get('ProfileByAdmin/:uid')
  async findOne(@Param('uid') uid: string) {
    return this.userinfoService.findOne(uid);
  }

  @UseGuards(JwtAuthGuard , RoleGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:uid')
  async remove(@Param('uid') uid: string) {  
    return this.userinfoService.remove(uid);
  }

  @UseGuards(JwtAuthGuard , RoleGuard)
  @Roles(Role.ADMIN)
  @Patch('update/:uid')
  async update(@Param('uid') uid: string, @Body() updateUserinfoDto: CreateUserinfoDto) {
    return this.userinfoService.update(uid, updateUserinfoDto);
  }
}
