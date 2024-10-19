# Ticket Management System

This project is a **Ticket Management System** designed to help users manage tickets effectively. It consists of two main parts: the **backend** built with .NET 8 and the **frontend** built with Angular.
Tickets-system/ │ ├── TicketSystemAPI/ # Backend API project │ ├── Models/ # Contains data models (e.g., Ticket model) │ ├── Controllers/ # Contains API controllers for handling requests │ ├── Data/ # Database context and migrations │ ├── Properties/ # Project properties and settings │ └── Program.cs # Entry point for the backend application │ └── front-end/ # Frontend Angular project ├── src/ # Main source files │ ├── app/ # Angular components and services │ ├── assets/ # Static assets like images and styles │ ├── environments/ # Environment configuration files │ └── index.html # Main HTML file for the Angular app ├── angular.json # Angular configuration file ├── package.json # Project dependencies and scripts └── tsconfig.json # TypeScript configuration file

markdown
Copy code

## Key Components

### Backend - TicketSystemAPI

- **Models:** Contains the data structures used in the application, including the `Ticket` model which has properties such as `TicketId`, `Description`, `Status`, and `Date`.

- **Controllers:** Handles HTTP requests and responses for the ticket management functionalities (CRUD operations).

### Frontend - front-end

- **Components:** Angular components for displaying the ticket list, adding new tickets, and editing existing tickets.

- **Services:** Manages API calls to the backend for fetching, creating, updating, and deleting tickets.

- **Routing:** Configured for navigating between different views (e.g., ticket list, add ticket).

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/salma-lab/Tickets-system.git
   cd Tickets-system
Backend Setup:

Navigate to the TicketSystemAPI folder.
Open the solution in Visual Studio.
Restore NuGet packages and build the project.
Run the backend API.
Frontend Setup:

Navigate to the front-end folder.
Install dependencies using npm:
bash
Copy code
npm install
Run the Angular application:
bash
Copy code
ng serve
Access the Application:

Open your web browser and go to http://localhost:4200.
Conclusion
This Ticket Management System provides a structured way to manage tickets effectively. Feel free to explore the project and understand how the backend and frontend interact.



