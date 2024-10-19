export interface Ticket {
    TicketId?: number;      // Make TicketId optional
    Description?: string;   // Description of the ticket (optional)
    Status?: string;        // Status of the ticket (optional), e.g., "Open" or "Closed"
    Date: Date;             // Date associated with the ticket
}

