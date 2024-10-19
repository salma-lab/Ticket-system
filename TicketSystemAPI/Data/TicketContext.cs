using Microsoft.EntityFrameworkCore;
using TicketSystemAPI.Models;

namespace TicketSystemAPI.Data
{
    public class TicketContext : DbContext
    {
        public TicketContext(DbContextOptions<TicketContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
    }

}
