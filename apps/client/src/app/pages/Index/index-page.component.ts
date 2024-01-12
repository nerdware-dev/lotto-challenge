import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketActions } from '../../store/ticket.actions';
import { selectTickets } from '../../store/ticket.selector';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketEntryComponent } from './ticket-entry/ticket-entry.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { CreateTicketDto } from '@lotto-challenge/dto';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TicketEntryComponent,
    TicketFormComponent,
  ],
  selector: 'lotto-challenge-index-page',
  templateUrl: './index-page.html',
})
export class IndexPageComponent implements OnInit {
  store = inject(Store);

  tickets$ = this.store.select(selectTickets);

  ngOnInit(): void {
    this.store.dispatch(TicketActions.retrieveTickets());
  }

  createTicket(createTicketDto: CreateTicketDto) {
    this.store.dispatch(TicketActions.createTicket(createTicketDto));
  }
}
