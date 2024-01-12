import { Body, Post, Controller, Get, Param } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDto, CreateTicketDto } from '@lotto-challenge/dto';

@Controller('/ticket')
export class TicketController {
  public constructor(private readonly ticketService: TicketService) {}

  @Get()
  public async retrieveAllTickets(): Promise<TicketDto[]> {
    return await this.ticketService.retrieveAllTickets();
  }

  @Get(':uuid')
  public async retrieveTicket(@Param('uuid') uuid: string): Promise<TicketDto> {
    return await this.ticketService.retrieveTicket(uuid);
  }

  @Post()
  public async createTicket(
    @Body() createTicketDto: CreateTicketDto
  ): Promise<TicketDto> {
    return await this.ticketService.createTicket(createTicketDto);
  }
}
