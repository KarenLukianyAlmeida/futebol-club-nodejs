
# What was developed

This project aimed to develop a RESTful API that performs CRUD operations to manage information about soccer teams and matches. The API can also generate and return team standings based on a set of business rules.

## Technologies

> Node.js | TypeScript | Express | Sequelize | MySQL | JWT | Mocha | Sinon | Chai | VS Code. 

## Skills Developed

- __ORM Utilization (Sequelize):__ Utilized ***Sequelize*** ORM to efficiently interact with the database, streamlining data operations.
  
- __Layered Architecture Implementation:__ Organized the project using the MvC ___(Model-View-Controller)___ architecture to ensure clean and maintainable code.
  
- __Data Validation:__ Implemented robust data validation techniques to ensure the integrity of information received by the API.
  
- __API Testing:__ Tested the application's endpoints using ___Thunder Client___ and conducted integration tests with ___Mocha, Chai, and Sinon___ to ensure reliability.

- __Authentication and Validation with JWT:__ mplemented ___JWT___ for user authentication and validation, securing the application.
 
- __SOLID Principles and OOP:__ eveloped the code following ___SOLID___ principles and ___Object-Oriented Programming (OOP)___ concepts for a robust and maintainable structure.

## Features

<details>
  <summary><strong>Endpoints</strong></summary><br />

  > 1. Returns all registered teams: 
  >
  > ```bash
  > GET /teams
  > ```
  >   
  > 2. Returns only the team with the `id` from the URL:
  >
  > ```bash
  > GET /teams/:id
  > ```
  >   
  > 3. Performs login for already registered users:
  >
  > ```bash
  > POST /login
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> {
  >>  "email": "string",
  >>  "password": "string"
  >> }
  >> ```
  > 
  > 4. Returns the user's type:
  >
  > ```bash
  > GET /login/role
  > ```
  >   
  > 5. Returns a list of matches.:
  >
  > ```bash
  > GET /matches
  > ```
  >   
  > 6. Returns all matches in progress.:
  >
  > ```bash
  > GET /matches?inProgress=true
  > ```
  >  
  > 7. Returns all finished matches:
  >
  > ```bash
  > GET /matches?inProgress=false
  > ```
  >
  > 8. Ends a match in the database:
  >
  > ```bash
  > PATCH /matches/:id/finish
  > ```
  >   
  > 9. Update the result of a match:
  >
  > ```bash
  > PATCH /matches/:id
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> {
  >>  "homeTeamGoals": 3,
  >>  "awayTeamGoals": 1
  >> }
  >> ```
  > 
  > 10. Register a new match in progress in the database:
  >
  > ```bash
  > POST /matches
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> {
  >>  "homeTeamId": 16,
  >>  "awayTeamId": 8,
  >>  "homeTeamGoals": 2,
  >>  "awayTeamGoals": 2
  >> }
  >> ```
  >
  > 11. Returns the standings of the home teams:
  >
  > ```bash
  > GET /leaderboard/home
  > ```
  >
</details>

<details>
  <summary><strong>Tests</strong></summary><br />

  > To run all tests, use the following command in the terminal:
  > 
  > ```bash
  > npm run test
  > ```
  >     

</details>


## Execute the project

1. __Clone the repository__

```bash
git clone https://github.com/KarenLukianyAlmeida/futebol-club-nodejs.git
```

2. __Install the dependencies__

Run the command in the root of the project.

```bash
npm run install:apps
```

3. __Start the frontend, backend and db containers from the compose__

Run the command in the root of the project.

```bash
npm run compose:up
```
