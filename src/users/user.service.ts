import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly _userModel: Model<User>) { }

    async create(createUserDto: CreateUserDTO): Promise<User> {
        return await new this._userModel(createUserDto).save();
    }

    async showAllUsers(): Promise<User[]> {
        return await this._userModel.find().exec();
    }

    async getUser(userId): Promise<User> {
        return await this._userModel.findById(userId).exec();
    }

    async updateUser(userID, createUserDTO: CreateUserDTO): Promise<User> {
        return await this._userModel.findByIdAndUpdate(userID, createUserDTO, { new: true });
    }

    async deleteUser(userID): Promise<User>{
        return await this._userModel.findOneAndDelete(userID);
    }
}