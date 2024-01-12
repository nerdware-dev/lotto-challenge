import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../models/ticket';
import { Box } from '../models/box';
import { TicketModule } from '../ticket/ticket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'local',
      entities: [Ticket, Box],
      synchronize: true,
    }),
    TicketModule,
  ],
})
export class AppModule {}
