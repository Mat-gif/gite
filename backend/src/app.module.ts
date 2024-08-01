import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: 'user',
      password: 'password',
      database: 'mydatabase',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
