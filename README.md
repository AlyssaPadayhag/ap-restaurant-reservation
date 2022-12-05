# Capstone: Restaurant Reservation System


# Live Application
frontend: https://ap-restaurant-reservation-frontend.onrender.com/dashboard

backend: https://ap-restaurant-reservation-backend.onrender.com

# API Endpoints
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