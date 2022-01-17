# Periodic Table Reservation System

## Website

[Live Website](https://www.github.com/jdavisson87)

## Technology

### _Front-End_

- React
- Bootstrap
- JavaScript
- CSS
- Jest

### _Back-End_

- Node
- Express
- Knex
- PostgreSQL

## Dashboard

![Dashboard Image](/readme-screenshots/Dashboard.png)

## API Documentation

| Endpoint                                  | Description                                                            |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `GET /reservations`                       | returns reservations                                                   |
| `POST /reservations`                      | creates and returns a reservation                                      |
| `GET /reservations?date='YYYY-MM-DD'`     | returns reservations on specified date                                 |
| `GET /reservations?mobile_number=123`     | returns reservations by searching for phone number                     |
| `GET /reservations/:reservationId`        | returns reservation by reservationId                                   |
| `PUT /reservations/:reservationId`        | updates and returns the reservation matching the reservationId         |
| `DELETE /reservations/:reservationId`     | deletes current reservation if no longer needed                        |
| `PUT /reservations/:reservationId/status` | updates the status of a reservation                                    |
| `GET /tables`                             | returns all Tables                                                     |
| `POST /tables`                            | creates and returns a new table                                        |
| `PUT /tables/:table_id/seat`              | assigns a table with a reservationId and changes status to "occupied"  |
| `DELETE /tables/:table_id/seat`           | updates a table by deleting reservationId and changes status to "free" |
| `GET /tables/:table_id/edit`              | returns table by table Id                                              |
| `PUT /tables/:table_id/edit`              | updated and returns the table matching the table Id                    |
| `DELETE /tables/:table_id/edit`           | removes table so it can no longer be used                              |

## Installation

1. Fork and clone this repository
2. Run `cp ./back-end/.env.sample ./back-end/.env`
3. Update the `./back-end/.env` file with db connections. You can set some up for free with ElephantSQL database instances.
4. Run `cp ./front-end/.env.sample ./front-end/.env`
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`
6. Run `npm install` to install project dependencies
7. run `npm run start:dev` from the back-end directory to start your server in development mode
8. run `npm start` from the front-end directory to start the React app at [http://localhost:3000](http://localhost:3000)
