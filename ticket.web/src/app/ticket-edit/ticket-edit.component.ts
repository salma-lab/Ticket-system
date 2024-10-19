import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html'
})
export class TicketEditComponent implements OnInit {
  ticket: any = { description: '', status: 'Open', date: new Date() };
  isNewTicket: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private ticketService: TicketService) {}

  ngOnInit(): void {
    // Get the ticket ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id'); // This should be 'id'
    console.log('Ticket ID from route:', id); // Debugging log

    if (id && id !== 'new') {
        this.isNewTicket = false;
        this.ticketService.getTicketById(Number(id)).subscribe(
            data => {
                this.ticket = data;
            },
            error => {
                console.error('Error fetching ticket:', error);
            }
        );
    }
}


saveTicket() {
  if (this.isNewTicket) {
      this.ticketService.addTicket(this.ticket).subscribe(() => {
          this.router.navigate(['/']);
      });
  } else {
      this.ticket.TicketId = Number(this.route.snapshot.paramMap.get('id')); // Ensure the ID is set
      this.ticketService.updateTicket(this.ticket).subscribe(() => {
          this.router.navigate(['/']);
      });
  }
}

}
