import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../repositories/user.repository';
import { RoleRepository } from 'src/repositories/role.repository';
import { CreateUserDto, LoginUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, 
        private readonly roleRepository: RoleRepository) {}

    async createUser(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10); 
        createUserDto.password = hashedPassword;
        const role = await this.roleRepository.getRoleByName(createUserDto.role)
        createUserDto.role = role
        const createdUser = await this.userRepository.createUser(createUserDto);
        return createdUser;
    }

    async authenticateUser(loginUserDto: LoginUserDto) {
        const loginUser = await this.userRepository.loginUser(loginUserDto)
        let role = {}
        if(loginUser.role){
            role = await this.roleRepository.getRoleById(loginUser.role)
        }
        return {...loginUser, role: role};
    }

    async importRoles(){
        const importRoles = await this.roleRepository.create()
        return importRoles
    }
}
