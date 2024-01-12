import { Column, Entity, OneToMany } from 'typeorm';
import { Box } from './box';
import { BaseEntity } from './base-entity';
import { TicketDto } from '@lotto-challenge/dto';

@Entity()
export class Ticket extends BaseEntity implements TicketDto {
  @Column('int', { nullable: true })
  public superNumber: number | null;

  @OneToMany(() => Box, 'ticket', { eager: true, cascade: true })
  public boxes: Box[];

  public constructor(options: { superNumber: number | null; boxes: Box[] }) {
    super();
    // TypeORM calls every class with empty arguments on initialization.
    if (!options) {
      return;
    }
    this.superNumber = options.superNumber;
    this.boxes = options.boxes;
  }
}
