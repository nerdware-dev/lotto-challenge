import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TicketActions } from '../../store/ticket.actions';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TicketDto } from '@lotto-challenge/dto';
import { selectTicket } from '../../store/ticket.selector';
import { Observable } from 'rxjs';
import { BoxComponent } from './box/box.component';

@Component({
  standalone: true,
  imports: [CommonModule, BoxComponent, RouterModule],
  selector: 'lotto-challenge-ticket-page',
  templateUrl: './ticket-page.html',
})
export class TicketPageComponent implements OnInit {
  store = inject(Store);
  route = inject(ActivatedRoute);

  ticket$!: Observable<TicketDto | undefined>;

  ngOnInit(): void {
    const ticketUuid = this.route.snapshot.paramMap.get('id');
    if (!ticketUuid) {
      return;
    }

    this.store.dispatch(TicketActions.retrieveTicket({ uuid: ticketUuid }));
    this.ticket$ = this.store.select(selectTicket(ticketUuid));
  }
}
