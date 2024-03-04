import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Document, Model, Schema as MongooseSchema, Types } from 'mongoose';
import { Role } from '../entities/role.entity';

export class RoleRepository {
    constructor(@InjectModel(Role.name) private readonly roleModel: Model<Role>) {}

    async getRoleByName(roleName: string) {
        let role;
        try {
            role = await this.roleModel.findOne({ name: roleName }).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!role) {
            throw new NotFoundException(`Role with name ${roleName} not found`);
        }

        return role;
    }
}