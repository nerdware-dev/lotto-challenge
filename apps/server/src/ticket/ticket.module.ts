import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../models/ticket';
import { Box } from '../models/box';
import { NumberService } from './number.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Box])],
  providers: [TicketService, NumberService],
  controllers: [TicketController],
})
export class TicketModule {}
