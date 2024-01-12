import { CreateTicketDto, TicketDto } from '@lotto-challenge/dto';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TicketActions = createActionGroup({
  source: 'Ticket',
  events: {
    'Retrieve Tickets': emptyProps(),
    'Retrieve Tickets Success': props<{ tickets: TicketDto[] }>(),
    'Retrieve Tickets Failure': emptyProps(),
    'Retrieve Ticket': props<{ uuid: string }>(),
    'Retrieve Ticket Success': props<{ ticket: TicketDto }>(),
    'Retrieve Ticket Failure': emptyProps(),
    'Create Ticket': props<CreateTicketDto>(),
    'Create Ticket Success': props<TicketDto>(),
    'Create Ticket Failure': emptyProps(),
  },
});
