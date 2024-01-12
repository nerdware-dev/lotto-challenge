import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { ticketFeature } from './store/ticket.reducer';
import { provideEffects } from '@ngrx/effects';
import { TicketEffects } from './store/ticket.effects';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(ticketFeature.name, ticketFeature.reducer),
    provideEffects([TicketEffects]),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
