import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from '../models/ticket';
import { InjectRepository } from '@nestjs/typeorm';
import { Box } from '../models/box';
import { CreateTicketDto } from '@lotto-challenge/dto';
import { NumberService } from './number.service';

@Injectable()
export class TicketService {
  public constructor(
    private readonly numberService: NumberService,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {}

  public async retrieveAllTickets(): Promise<Ticket[]> {
    return await this.ticketRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async retrieveTicket(uuid: string): Promise<Ticket> {
    return await this.ticketRepository.findOne({
      where: {
        uuid,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const boxes = Array.from({ length: createTicketDto.boxes }).map(() =>
      this.createTicketBox()
    );

    let superNumber: number | null = null;
    if (createTicketDto.withSuperNumber) {
      superNumber = this.numberService.generateRandomNumberInRange(1, 9);
    }

    return await this.ticketRepository.save(
      new Ticket({
        superNumber,
        boxes,
      })
    );
  }

  /**
   * Creates a box containing 6 distinct random numbers with `1 <= n <= 49`
   */
  private createTicketBox(): Box {
    const numbersToGenerate = 6;
    const drawnNumbers = [];

    while (drawnNumbers.length < numbersToGenerate) {
      const generatedNumber = this.numberService.generateRandomNumberInRange(
        1,
        49
      );
      if (!drawnNumbers.includes(generatedNumber)) {
        drawnNumbers.push(generatedNumber);
      }
    }

    drawnNumbers.sort((a, b) => a - b);

    return new Box({ drawnNumbers });
  }
}
