import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_userinfo} from './entities/userinfo.entity';
@Injectable()
export class UserinfoService {
  constructor(@InjectRepository(DB_userinfo) readonly userRepository : Repository<DB_userinfo>) {}
  //Create user
  async create(createUserinfoDto: CreateUserinfoDto):Promise<string> {
    try {
      const response = await this.userRepository.create(createUserinfoDto);
      await this.userRepository.save(response);
      const result = await this.userRepository.findOne({ where: { email: createUserinfoDto.email } });
      if(result){
        return `User ${result.email} created successfully`; 
      }
    } catch (error) {
      if (error.code === '23505' || error.code === 'ER_DUP_ENTRY' || error.message?.includes('UNIQUE constraint failed')) { 
        if(error.message?.includes('email')){
          throw new InternalServerErrorException(`User with email ${createUserinfoDto.email} already exists`);
        }else{
          throw new InternalServerErrorException(`User with phone ${createUserinfoDto.phone} already exists`);
        }
      } else {
        return `Error creating user: ${error.message}`;
      }
    }
    return `Unexpected error occurred while creating user`;
  }

  async findAll():Promise<string | any[]> {
    try {
      const response = await this.userRepository.find();
      if(response.length > 0 ){
        return response.map((user) => {
          return {
            uuid : user.uuid,
            email: user.email,
            phone: user.phone,
          } })
      } else {
        return `No users found`;
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return `Error fetching users: ${error.message}`;    
    }
  }

  async findOne(uid:string):Promise<string | any> {
    console.log(uid);
    try {
      const response = await this.userRepository.findOne({
        where:[
          {email:uid},
          {phone:uid},
        ]
      })
      if(response){
        return {
          uuid : response.uuid,
          email: response.email,
          password: response.password,
          phone: response.phone,
          role: response.role,
        }
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return `Error fetching user: ${error.message}`;
    }
  }

  async update(uid:string, updateUserinfoDto: UpdateUserinfoDto):Promise<any> {
    try {
      const response = await this.userRepository.findOne({where:{email:uid}})
      if(response){
        await this.userRepository.update({email:uid},updateUserinfoDto);
        const updatedUser = await this.userRepository.findOne({where:{email:uid}})
        if(updatedUser){
          return {
            uuid : updatedUser.uuid,
            email: updatedUser.email,
            phone: updatedUser.phone,
          }
        } else {
          return `User not found`;
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return `Error updating user: ${error.message}`;
      
    }
    // return `This action updates a #${user.email} userinfo \n Data: ${updateUserinfoDto}`;
  }

  async remove(uid:string):Promise<any> {
    try {
      const response = await this.userRepository.findOne({where:{email:uid}})
      if(response){
        await this.userRepository.delete({email:uid});
        return `User ${uid} deleted successfully`;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return `Error deleting user: ${error.message}`;
      
    }
  }
}
