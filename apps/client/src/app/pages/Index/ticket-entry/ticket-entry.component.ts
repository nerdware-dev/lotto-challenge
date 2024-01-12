import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDto } from '@lotto-challenge/dto';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'lotto-challenge-ticket-entry',
  templateUrl: './ticket-entry.html',
})
export class TicketEntryComponent {
  @Input()
  ticket!: TicketDto;

  router = inject(Router);

  @HostListener('click') onClick() {
    this.router.navigate([`/ticket/${this.ticket.uuid}`]);
  }
}
