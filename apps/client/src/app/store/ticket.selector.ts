import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState, ticketFeature } from './ticket.reducer';

const selectTicketState = createFeatureSelector<TicketState>(
  ticketFeature.name
);

export const selectTickets = createSelector(
  selectTicketState,
  (state: TicketState) => state.tickets
);

export const selectTicket = (uuid: string) =>
  createSelector(selectTicketState, (state: TicketState) =>
    state.tickets.find((ticket) => ticket.uuid === uuid)
  );
