import { Route } from '@angular/router';
import { IndexPageComponent } from './pages/Index/index-page.component';
import { TicketPageComponent } from './pages/ticket/ticket-page.component';

export const appRoutes: Route[] = [
  { path: '', component: IndexPageComponent },
  { path: 'ticket/:id', component: TicketPageComponent },
];
