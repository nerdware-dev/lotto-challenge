import { TicketDto } from '@lotto-challenge/dto';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TicketActions } from './ticket.actions';

export interface TicketState {
  tickets: TicketDto[];
}

// TODO: Loading and error handling
export const initialState: TicketState = {
  tickets: [],
};

// TODO: Use entity lib
export const ticketReducer = createReducer(
  initialState,
  on(TicketActions.retrieveTicketsSuccess, (state, { tickets }) => ({
    ...state,
    tickets,
  })),
  on(TicketActions.retrieveTicketSuccess, (state, { ticket }) => ({
    ...state,
    tickets: [ticket],
  })),
  on(TicketActions.createTicketSuccess, (state, createdTicket) => ({
    ...state,
    tickets: [createdTicket, ...state.tickets],
  }))
);

export const ticketFeature = createFeature({
  name: 'ticket',
  reducer: ticketReducer,
});
