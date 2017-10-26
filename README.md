# Dinnerbell

Discover new recipes, plan out meals, and invite other users to the feast! 

## App Description

* Users can create an account locally or log in via facebook/google. 

* Recipes can be searched as a guest, but cannot be rated or added until the user has registered. 

* Users can view the profiles of other users and see their favorite recipes, meal dates, and dietary preferences. 

* Users are able to rate recipes and share their rating with others.

[Checkout Dinnerbell here!](https://dinnerbell.herokuapp.com/)

If there are any problem, make sure to check if Heroku is having any issues.

## Technologies

Frontend:
* React
* Redux

Backend:
* Node
* Express
* MongoDB / Mongoose

Tools:
* Webpack
* Babel
* AWS SC2
* Sendgrid mailer
* Passport

Tests:
* Enzyme
* Jest

## Wireframes

The wireframe can be found as 'Dinnerbell.pdf' in the root directory.


## API Reference

### Meals
* GET /api/meals :: Returns a list of meals
* POST /api/meals :: Creates a new meal
* POST /api/meals/picture :: Uploads a picture of a new meal
* GET /api/meals/:id :: Get a meal by id
* PATCH /api/meals/:id :: Update a meal by id
* DELETE /api/meals/:id :: Remove a meal by id

### Recipes
* GET /api/recipes :: Returns a list of recipes
* POST /api/recipes :: Creates a new recipe
* GET /api/recipes/:id :: Get a recipe by id
* PATCH /api/recipes/:id :: Update a recipe by id
* DELETE /api/recipes/:id :: Remove a recipe by id

### Ratins
* GET /api/ratings :: Returns a list of ratings
* POST /api/ratings :: Creates a new rating
* GET /api/ratings/:id :: Get a rating by id
* PATCH /api/ratings/:id :: Update a rating by id
* DELETE /api/ratings/:id :: Remove a rating by id

### Users
* GET /api/users :: Returns a list of users
* GET /api/users/:id :: Get a user by id
* POST /api/users/picture :: Uploads a picture of a user profile picture
* PATCH /api/:userId/recipes/:recipesId :: Updates a user's recipe by id
* DELETE /api/:userId/recipes/:recipesId :: Delete a user's recipe by id
* DELETE /api/users/:id :: Remove a user by id
* DELETE /api/users/picture :: Deletes a user profile picture


## To Develop / Running the App Locally

For Github:

* Clone the repository.
* Run npm install inside of the root directory.
* Run npm install in both the client and server folders.
* Return to the root directory
* Run the following npm script:
```
npm run dev
```
* Visit localhost:3000 

For Testing:
* For more information regarding Redux testing, visit their awesome [documentation.](http://redux.js.org/docs/recipes/WritingTests.html)
* To start the tests, go to the root directory of the project folder and run:
```
npm run test:watch
```
* This will start the test watching!
* Cheers!
