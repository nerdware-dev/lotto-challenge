import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTicketDto, TicketDto } from '@lotto-challenge/dto';

const baseUrl = '/api';

@Injectable({ providedIn: 'root' })
export class TicketService {
  httpClient = inject(HttpClient);

  retrieveTickets(): Observable<TicketDto[]> {
    return this.httpClient.get<TicketDto[]>(baseUrl + '/ticket');
  }

  retrieveTicket(uuid: string): Observable<TicketDto> {
    return this.httpClient.get<TicketDto>(baseUrl + '/ticket/' + uuid);
  }

  createTicket(createdTicketDto: CreateTicketDto): Observable<TicketDto> {
    return this.httpClient.post<TicketDto>(
      baseUrl + `/ticket`,
      createdTicketDto
    );
  }
}
