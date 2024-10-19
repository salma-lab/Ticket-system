using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystemAPI.Data;
using TicketSystemAPI.Models;

namespace TicketSystemApi.Controllers
{
    [ApiController]
    [Route("api/tickets")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketContext _context;

        public TicketsController(TicketContext context)
        {
            _context = context;
        }

        // GET: api/tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            return await _context.Tickets.ToListAsync();
        }

        // GET: api/tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        // POST: api/tickets
        [HttpPost]
        public async Task<ActionResult<Ticket>> CreateTicket([FromBody] Ticket ticket)
        {
            // Log the incoming ticket for debugging
            Console.WriteLine($"Creating ticket: {Newtonsoft.Json.JsonConvert.SerializeObject(ticket)}");

            // Validate the model state
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for unique Ticket ID
            if (await TicketExists(ticket.TicketId))
            {
                return Conflict("A ticket with this ID already exists."); // Return 409 if ID exists
            }

            ticket.Date = DateTime.Now; // Automatically set the creation date
            _context.Tickets.Add(ticket);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) // Catch any potential errors during save
            {
                Console.WriteLine($"Error saving ticket: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.TicketId }, ticket);
        }

        // PUT: api/tickets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, Ticket ticket)
        {
            if (id != ticket.TicketId)
            {
                return BadRequest("Ticket ID mismatch."); // Added message for clarity
            }

            _context.Entry(ticket).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await TicketExists(id)) // Updated to be asynchronous
                {
                    return NotFound("Ticket not found."); // Added message for clarity
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound("Ticket not found."); // Added message for clarity
            }
            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if a ticket exists by ID
        private async Task<bool> TicketExists(int id)
        {
            return await _context.Tickets.AnyAsync(e => e.TicketId == id);
        }
    }
}
