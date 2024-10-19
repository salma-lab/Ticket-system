import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html'
})
export class TicketFormComponent {
  ticket = {
    ticketId: '', // User will enter the ticketId
    description: '',
    status: 'Open', // Default status
    date: new Date().toISOString().slice(0, 16) // Current date in ISO format
  };

  constructor(private ticketService: TicketService, private router: Router) {}

  saveTicket() {
    // Prepare the ticket object
    const ticket: Ticket = {
        TicketId: Number(this.ticket.ticketId), // Get the ticketId from the form input
        Description: this.ticket.description, 
        Status: this.ticket.status, 
        Date: new Date(this.ticket.date) // Convert date to a valid Date object
    };

    // Make the API call to add the ticket
    this.ticketService.addTicket(ticket).subscribe(
        () => {
            this.router.navigate(['/']); // Navigate to the ticket list on success
        },
        error => {
            console.error('Error adding ticket:', error);
            alert('Failed to add ticket: ' + error.message); // Show an alert with the error message
        }
    );
  }
}


