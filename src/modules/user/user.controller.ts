import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { Connection, Schema as MongooseSchema } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/create_user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    
    constructor(@InjectConnection() private readonly mongoConnection: Connection, private userService: UserService, private jwtService : JwtService) {}

    @Post('/create_user')
    async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const newUser: any = await this.userService.createUser(createUserDto);
            return res.status(HttpStatus.CREATED).send(newUser);
        } catch (error) {
            throw new BadRequestException(error);
        } 
    }

    
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto , @Res() res: Response) {
        try {
            const user = await this.userService.authenticateUser(loginUserDto);
            const payload = { 
                userId: user._id,
                userEmail: user.email,
                role: user.role 
            };
            const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
            return res.status(HttpStatus.OK).json({ token });
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
