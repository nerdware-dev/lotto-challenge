import { IsBoolean, IsInt, Max, Min } from 'class-validator';

export class BaseEntityDto {
  public uuid!: string;
  public createdAt!: Date;
}

export class BoxDto extends BaseEntityDto {
  public drawnNumbers!: number[];
}

export class TicketDto extends BaseEntityDto {
  public superNumber!: number | null;
  public boxes!: BoxDto[];
}

export class CreateTicketDto {
  @IsInt()
  @Min(1)
  @Max(20)
  public boxes!: number;

  @IsBoolean()
  public withSuperNumber!: boolean;
}
