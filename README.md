# Restaurant Reservation System

> A reservation system software used only by restaurant personnel when a customer calls to request a reservation.

## Description 

 This repository is set up as a *monorepo*, meaning that the front-end and back-end projects are in one repository. This allows you to open both projects in the same editor. The application allows users to create, read, update and delete reservations as well as seat them at available tables. Showcases outside-in
 (front-end to back-end) development using the PERN tech stack (Postgres, Express, React, Node).<br><br>
 [Live Demo]( https://restaurant-capstone-frontend.herokuapp.com/dashboard)
 
---
## Installation

1. Fork/clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` in `/back-end` to start your server in development mode.
1. Run `npm start` in `/front-end` to launch project locally.

---

## Screenshots
**Dashboard** <br>
- The Dashboard is displayed as the homepage at `/dashboard` <br>
- The Today button takes you to today's reservations.<br>
- Next and Previous buttons are also displayed for the user to go to previous or next day reservations.<br>
- Existing reservations are listed with option to seat, edit or cancel each reservation. <br>
- Existing tables that are available and occupied are listed with a done button allowing the user to free up the table once finished serving. <br><br>
<img width="800" alt="dashboard" src="https://user-images.githubusercontent.com/87205105/144460133-187512db-5c18-4a5e-9f8e-368334156382.PNG"><br>

**Seat Reservation** <br>
- The seat reservation page is displayed at `reservations/:reservation_id/seat`<br>
- This allows the user to select a table to seat the selected reservation. <br><br>
<img width="800" alt="seatReservation" src="https://user-images.githubusercontent.com/87205105/144460382-9cd37b5d-6d00-4542-bb8c-718e046acfd1.PNG"><br>


**Edit Reservation**<br>
- A reservation can be edited at `reservations/:reservation_id/edit`<br>
- This allows the user to update an existing reservation and make any changes.<br><br>
<img width="800" alt="editReservation" src="https://user-images.githubusercontent.com/87205105/144460448-58c62184-f13a-49b2-bcf5-f441f28adcdf.PNG"><br>

**Cancel Reservation**<br>
- The cancel button with prompt the user to confirm the cancellation. <br><br>
<img width="800" alt="cancelReservation" src="https://user-images.githubusercontent.com/87205105/144460493-c64ab85a-54c3-4b55-ac1b-6a917eca1650.PNG"><br>

**Search Reservation**<br>
- The Search page is displayed at `/search`<br>
- This allows the user to search a customer's mobile phone number and will list all past and current reservations for that number. <br><br>
<img width="800" alt="search" src="https://user-images.githubusercontent.com/87205105/144460527-151d23b8-67f3-4329-bfbd-1a22068ed3e0.PNG"><br>

**New Reservation**<br>
- The New Reservation page is displayed at `/reservations/new`<br>
- This allows the user to fill out a form to create a new reservation. <br>
- Validations are put in place to make sure reservations are created during business hours. <br><br>
<img width="800" alt="newReservation" src="https://user-images.githubusercontent.com/87205105/144460564-7c407cb5-619a-453c-af6a-ecdb8f896c06.PNG"><br>

**New Table**<br>
- The New Table page is displayed at `/tables/new`<br>
- This allows the user to create a new table that may have been newly added to the restaurant. <br><br>
<img width="800" alt="createTable" src="https://user-images.githubusercontent.com/87205105/144460626-c132f395-62a5-4128-90d1-ee2a261b1e16.PNG"><br>

---
## Technology and Tools
| Front-end  | Back-end    |
|------------|-------------|
| React.js   | Node.js     |
| JavaScript | PostgreSQL  |
| HTML       | Express     |        
| CSS        | Knex        |
| BootStrap4 | RESTfulAPIs |
| Moment.js  | ElephantSQL |

<br>

**Deployed on Heroku**
