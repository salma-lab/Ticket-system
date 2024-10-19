import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from './models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'https://localhost:7004/api/Tickets';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

 
  addTicket(ticket: any): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
}


  

  updateTicket(ticket: Ticket): Observable<Ticket> {
    console.log('Updating ticket:', ticket); // Debugging output
    return this.http.put<Ticket>(`${this.apiUrl}/${ticket.TicketId}`, ticket); // Ensure TicketId is used correctly
  }
  
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
