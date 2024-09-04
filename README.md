
# Skills Developed

- __ORM Utilization (Sequelize):__ Utilized ***Sequelize*** ORM to efficiently interact with the database, streamlining data operations.
  
- __Layered Architecture Implementation:__ Organized the project using the MSC ___(Model-Service-Controller)___ architecture to ensure clean and maintainable code.
  
- __Data Validation:__ Implemented robust data validation techniques to ensure the integrity of information received by the API.
  
- __API Testing:__ Tested the application's endpoints using ___Thunder Client___ and conducted integration tests with ___Mocha, Chai, and Sinon___ to ensure reliability.

- __Authentication and Validation with JWT:__ mplemented ___JWT___ for user authentication and validation, securing the application.
 
- __SOLID Principles and OOP:__ eveloped the code following ___SOLID___ principles and ___Object-Oriented Programming (OOP)___ concepts for a robust and maintainable structure.

# What was developed

API RESTfull developed to be consumed by a frontend provided by the technical team at Trybe. This API manages matches and team standings in soccer.

# Features

<details>
  <summary><strong>Endpoints</strong></summary><br />

  > 1. Returns all registered products: 
  >
  > ```bash
  > GET /products
  > ```
  >   
  > 2. Returns only the product with the `id` from the URL:
  >
  > ```bash
  > GET /products/:id
  > ```
  >   
  > 3. Returns all sales:
  >
  > ```bash
  > GET /sales
  > ```
  >   
  > 4. Returns only the sale with the `id` from the URL:
  >
  > ```bash
  > GET /sales/:id
  > ```
  >   
  > 5. Registers a new product:
  >
  > ```bash
  > POST /products
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> { "name": "ProdutoX" }
  >> ```
  >   
  > 6. Registers a new sale:
  >
  > ```bash
  > POST /sales
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >>[
  >>  {
  >>    "productId": 1,
  >>    "quantity": 1
  >>  },
  >>  {
  >>    "productId": 2,
  >>    "quantity": 5
  >>  }
  >> ]
  >> ```
  >  
  > 7. Updates a product:
  >
  > ```bash
  > PUT /products/:id
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> {
  >>  "name": "Martelo do Batman"
  >> }
  >> ```
  >
  > 8. Deletes a product by `id`:
  >
  > ```bash
  > DELETE /products/:id
  > ```
  >   
  > 9. Deletes a sale by `id`:
  >
  > ```bash
  > DELETE /sales/:id
  > ```
  >   
  > 10. Updates the quantity of a product:
  >
  > ```bash
  > /sales/:saleId/products/:productId/quantity
  > ```
  >
  >> The request body should follow the format below:
  >>
  >>```json
  >> {
  >>  "quantity": 20
  >> }
  >> ```
  >
  > 11. Returns all products that contain the declared name in the query:
  >
  > ```bash
  > GET /products/search
  > ```
  >
  >> The query params of the request should follow the format below:
  >>
  >>```bash
  >>  http://localhost:PORT/products/search?q=Martelo
  >> ```
  >
</details>

<details>
  <summary><strong>Tests</strong></summary><br />

  > To run all tests, use the following command in the terminal:
  > 
  > ```bash
  > npm run test:mocha
  > ```
  >     

</details>


# Execute the project

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
