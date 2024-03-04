import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleRepository } from 'src/repositories/role.repository';
import {Role, RoleSchema } from 'src/entities/role.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository, RoleRepository],
    exports: [UserService, UserRepository, RoleRepository],
})
export class UserModule {}
