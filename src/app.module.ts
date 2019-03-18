import { Module } from '@nestjs/common';
import { MongooseModule  } from '@nestjs/mongoose';
import { UsersModule  } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mallth194:m.8162348@cluster0-cskwb.mongodb.net/ideas', { useNewUrlParser: true, useCreateIndex: true }),
    // MongooseModule.forRoot('mongodb://localhost:27017/ideas', { useNewUrlParser: true, useCreateIndex: true }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

