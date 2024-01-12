import { Test } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { NumberService } from './number.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../models/ticket';
import { Box } from '../models/box';

describe('TicketService', () => {
  let service: TicketService;
  const numberServiceStub = {
    generateRandomNumberInRange: jest.fn(),
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'test',
          password: 'test',
          database: 'test',
          entities: [Ticket, Box],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Ticket, Box]),
      ],
      providers: [
        TicketService,
        {
          provide: NumberService,
          useValue: numberServiceStub,
        },
      ],
    }).compile();

    service = app.get<TicketService>(TicketService);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('createTicket', () => {
    it('generates a ticket with a box that contains 6 distinct numbers', async () => {
      expect.assertions(1);
      numberServiceStub.generateRandomNumberInRange
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(44)
        .mockReturnValueOnce(30);

      const createdTicket = await service.createTicket({
        boxes: 1,
        withSuperNumber: false,
      });

      expect(createdTicket.boxes[0].drawnNumbers).toStrictEqual([
        2, 7, 12, 19, 30, 44,
      ]);
    });

    it('generates a ticket with a box that contains 6 distinct numbers even if some are drawn multiple times', async () => {
      expect.assertions(1);
      numberServiceStub.generateRandomNumberInRange
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(44)
        .mockReturnValueOnce(30);

      const createdTicket = await service.createTicket({
        boxes: 1,
        withSuperNumber: false,
      });

      expect(createdTicket.boxes[0].drawnNumbers).toStrictEqual([
        2, 7, 12, 19, 30, 44,
      ]);
    });

    it('generates a ticket with multiple boxes that contain 6 distinct numbers', async () => {
      expect.assertions(3);
      numberServiceStub.generateRandomNumberInRange
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(44)
        .mockReturnValueOnce(30)
        .mockReturnValueOnce(6)
        .mockReturnValueOnce(8)
        .mockReturnValueOnce(33)
        .mockReturnValueOnce(49)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(18);

      const createdTicket = await service.createTicket({
        boxes: 2,
        withSuperNumber: false,
      });

      expect(createdTicket.boxes.length).toStrictEqual(2);
      expect(createdTicket.boxes[0].drawnNumbers).toStrictEqual([
        2, 7, 12, 19, 30, 44,
      ]);
      expect(createdTicket.boxes[1].drawnNumbers).toStrictEqual([
        1, 6, 8, 18, 33, 49,
      ]);
    });

    it('generates a ticket with a superNumber if specified', async () => {
      expect.assertions(1);
      numberServiceStub.generateRandomNumberInRange
        .mockReturnValueOnce(9)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(44)
        .mockReturnValueOnce(30);

      const createdTicket = await service.createTicket({
        boxes: 1,
        withSuperNumber: true,
      });

      expect(createdTicket.superNumber).not.toBeNull();
    });

    it('generates a ticket without a superNumber if specified', async () => {
      expect.assertions(1);
      numberServiceStub.generateRandomNumberInRange
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(7)
        .mockReturnValueOnce(19)
        .mockReturnValueOnce(12)
        .mockReturnValueOnce(44)
        .mockReturnValueOnce(30);

      const createdTicket = await service.createTicket({
        boxes: 1,
        withSuperNumber: false,
      });

      expect(createdTicket.superNumber).toBeNull();
    });
  });
});
