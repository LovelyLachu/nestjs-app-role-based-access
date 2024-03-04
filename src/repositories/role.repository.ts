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
            throw new NotFoundException(`Role with name ${roleName} not found please use /import_roles API`);
        }

        return role;
    }

    async getRoleById(id: any){
        let role;
        try {
            role = await this.roleModel.findById(id).exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!role) {
            throw new NotFoundException(`Your role is removed from the DB please conduct admin`);
        }

        return role;
    }

    async create(){
        const roles = [{
            "_id": "65e54ef22d2c86351c4cd914",
            "name": "USER",
            "access": 
              {
                "restaurant": [
                  "READ"
                ],
                "review": [
                  "CREATE",
                  "READ",
                  "UPDATE",
                  "DELETE"
                ]
            }
          },
          {
            "_id": "65e54ef22d2c86351c4cd915",
            "name": "ADMIN",
            "access": 
              {
                "restaurant": [
                  "CREATE",
                  "READ",
                  "UPDATE",
                  "DELETE"
                ],
                "review": [
                  "CREATE",
                  "READ",
                  "UPDATE",
                  "DELETE"
                ]
              }
            
          },
          {
            "_id": "65e54ef22d2c86351c4cd916",
            "name": "OWNER",
            "access": 
              {
                "restaurant": [
                  "CREATE",
                  "READ",
                  "UPDATE",
                  "DELETE"
                ],
                "review": [
                  "READ",
                  "UPDATE"
                ]
              }
          }]
          await this.roleModel.deleteMany({})
          const created = this.roleModel.create(roles)
          return created;
    }
}