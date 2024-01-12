import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TicketService } from '../ticket.service';
import { catchError, map, exhaustMap, of, tap } from 'rxjs';
import { TicketActions } from './ticket.actions';
import { Router } from '@angular/router';

@Injectable()
export class TicketEffects {
  public constructor(
    private actions$: Actions,
    private ticketService: TicketService,
    private router: Router
  ) {}

  retrieveTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.retrieveTickets),
      exhaustMap(() =>
        this.ticketService.retrieveTickets().pipe(
          map((tickets) => TicketActions.retrieveTicketsSuccess({ tickets })),
          catchError(() => of(TicketActions.retrieveTicketsFailure()))
        )
      )
    )
  );

  retrieveTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.retrieveTicket),
      exhaustMap(({ uuid }) =>
        this.ticketService.retrieveTicket(uuid).pipe(
          map((ticket) => TicketActions.retrieveTicketSuccess({ ticket })),
          catchError(() => of(TicketActions.retrieveTicketFailure()))
        )
      )
    )
  );

  createTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.createTicket),
      exhaustMap((createTicketDto) =>
        this.ticketService.createTicket(createTicketDto).pipe(
          map((createdTicket) =>
            TicketActions.createTicketSuccess(createdTicket)
          ),
          catchError(() => of(TicketActions.createTicketFailure()))
        )
      )
    )
  );

  ticketCreated$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TicketActions.createTicketSuccess),
        tap((createdTicket) =>
          this.router.navigate(['/', 'ticket', createdTicket.uuid])
        )
      );
    },
    { dispatch: false }
  );
}
