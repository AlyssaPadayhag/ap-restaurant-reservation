# Capstone: Restaurant Reservation System

### The restaurant reservation system manages reservations and table occupancy. The user is able to create reservations and only book them within business hours. Reservation can also be edited and cancelled.

### The user can also create new tables in the restaurant.

### Once the reserved party has arrived at the restaurant, the user can then assign a table to the party and only assign a table that has sufficient capacity.

# Live Application:
frontend: https://ap-restaurant-reservation-frontend.onrender.com

backend: https://ap-restaurant-reservation-backend.onrender.com

# Built with:
- HTML, CSS
- Bootstrap v4
- JavaScript, Node, React, JSX
- Express, PostgreSQL, Knex, cORS
- Git, GitHub, Git BASH,
- Vercel, Render
- Jest
- Modern Asynchronous Programming
- Outside-in development

# API Endpoints:
| Method | URL | Description |
| ------ | --- | ----------- |
| GET | /reservations | list all resevations |
| GET | /reservations?date=YYYY-MM-DD | list reservations by date |
| GET | /search | list reservations by mobile number
| POST | /reservations | create new reservation |
| GET | /:reservation_id | list one reservation by ID |
| PUT | /:reservaiton_id | update reservation |
| PUT | /:reservation_id/status | update reservation status (booked, seated, finished, cancelled) |
| GET | /tables | list all tables |
| POST | /tables | create new table |
| GET | /:table_id/seat | list all tables |
| PUT | /:table_id/seat | update table status |
| DELETE | /:table_id/seat | remove table status |

# Installation:
1. Fork and clone this repository.
2. Run cp ./back-end/.env.sample ./back-end/.env.
3. Update the ./back-end/.env file with the connection URL's to your ElephantSQL database instance.
4. Run cp ./front-end/.env.sample ./front-end/.env.
5. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5000.
6. Run npm install to install project dependencies.
7. Run npm run start:dev to start your server in development mode.

# Screenshots:
Dashboard
![This is an image](/images/dashboard.png)

Create Reservation
![This is an image](/images/create_reservation.png)

Create Table
![This is an image](/images/create_table.png)

Seat Reservation
![This is an image](/images/seat_reservation.png)
