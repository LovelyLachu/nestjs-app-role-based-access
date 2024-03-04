import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/user.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, private readonly roleRepository: RoleRepository) {}

    async createUser(createUserDto: CreateUserDto, session: ClientSession) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
        createUserDto.password = hashedPassword;
        console.log(createUserDto.password,"createUserDto.password")
        const role = await this.roleRepository.getRoleByName(createUserDto.role)
        createUserDto.role = role
        const createdUser = await this.userRepository.createUser(createUserDto, session);
        return createdUser;
    }
}
