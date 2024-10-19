import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html'
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];
  filteredTickets: any[] = [];

  // Filter & Sorting
  filterStatus = '';
  filterId = ''; // Added filter for Ticket ID
  sortColumn = 'ticketId';
  sortDirection = 'asc';

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
      this.applyFilters();
    });
  }

  // Delete functionality
  deleteTicket(ticketId: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(ticketId).subscribe(
        () => {
          this.loadTickets(); // Reload the list after successful deletion
        },
        (error) => {
          console.error('Error deleting ticket:', error);
        }
      );
    }
  }

  // Edit functionality
  editTicket(ticketId: number) {
    this.router.navigate(['/edit', ticketId]); // Navigate to edit route with the ticket ID
  }

  // Sorting function
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting(): void {
    this.filteredTickets.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Apply filters for Ticket ID and Status and sort the tickets
  applyFilters(): void {
    this.filteredTickets = this.tickets.filter(ticket => {
      const idMatches = this.filterId === '' || ticket.ticketId.toString().includes(this.filterId);
      const statusMatches = this.filterStatus === '' || ticket.status === this.filterStatus;
      return idMatches && statusMatches;
    });

    this.applySorting();
  }

  // Filter tickets by ID or Status whenever a filter changes
  filterTickets(): void {
    this.applyFilters();
  }
}
