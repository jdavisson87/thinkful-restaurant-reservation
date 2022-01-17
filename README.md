# Periodic Table Reservation System

## Website

[Live Website](https://www.github.com/jdavisson87)

## Technology

### Front-End

- React
- Bootstrap
- Jest

### Back-End

- Node
- Express
- Knex
- PostgreSQL

## Installation

1. Fork and clone this repository
2. Run `cp ./back-end/.env.sample ./back-end/.env`
3. Update the `./back-end/.env` file with db connections. You can set some up for free with ElephantSQL database instances.
4. Run `cp ./front-end/.env.sample ./front-end/.env`
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`
6. Run `npm install` to install project dependencies
7. run `npm run start:dev` from the back-end directory to start your server in development mode
8. run `npm start` from the front-end directory to start the React app at [http://localhost:3000](http://localhost:3000)
