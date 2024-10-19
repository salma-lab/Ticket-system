import { Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

export const routes: Routes = [
  { path: '', component: TicketListComponent },
  { path: 'edit/:id', component: TicketEditComponent },
  { path: 'add', component: TicketFormComponent }, // Route for adding a new ticket
];
