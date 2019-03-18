import { Controller, Get, Post, Body, Res, HttpStatus, Param, NotFoundException, Put, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.interface';
import { ValidateObjectId } from './../shared/pipes/validate-object-id.pipe';
import * as bcrypt from 'bcryptjs';

@Controller('api/users')
export class UserController {

    constructor(private readonly _UserService: UserService) { }

    @Post('login')
    async login(){

    }

    @Post('register')
    async create(@Res() res, @Body() body) {

        body.email = body.email.toLowerCase().trim().replace(/ /g, "");
        body.password = await bcrypt.hashSync(body.password, 10);

        const user = await this._UserService.create(body);

        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully added!!',
            user
        });
    }

    @Get()
    async showAllUsers(@Res() res): Promise<User[]> {
        const users = await this._UserService.showAllUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':userID')
    async getUser(@Res() res, @Param('userID', new ValidateObjectId()) userID): Promise<User[]> {
        const fetchedUser = await this._UserService.getUser(userID);

        if (!fetchedUser) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json(fetchedUser);
    }

    @Put()
    async updateUser(@Res() res, @Query('userID', new ValidateObjectId()) userID, @Body() body) {

        const updateUser = await this._UserService.updateUser(userID, body);

        if (!updateUser) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated!',
            updateUser
        });
    }

    @Delete()
    async deleteUser(@Res() res, @Query('userID', new ValidateObjectId()) userID) {
        const deletedUser = await this._UserService.deleteUser(userID);

        if (!deletedUser) {
            throw new NotFoundException('User does not exist!');
        }
        return res.status(HttpStatus.OK).json({
            message: 'User has been successfully deleted!',
            deletedUser
        });
    }
}