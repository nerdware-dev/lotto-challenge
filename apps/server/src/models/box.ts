import { Column, Entity, ManyToOne } from 'typeorm';
import { Ticket } from './ticket';
import { BaseEntity } from './base-entity';
import { BoxDto } from '@lotto-challenge/dto';

@Entity()
export class Box extends BaseEntity implements BoxDto {
  @Column('int', { array: true, nullable: false })
  public drawnNumbers: number[];

  @ManyToOne(() => Ticket, { nullable: false, onDelete: 'CASCADE' })
  public ticket: Ticket;

  public constructor(options: { drawnNumbers: number[] }) {
    super();
    // TypeORM calls every class with empty arguments on initialization.
    if (!options) {
      return;
    }

    this.drawnNumbers = options.drawnNumbers;
  }
}
