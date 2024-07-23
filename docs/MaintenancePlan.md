# Maintenance Plan

## Local Installation
```
cd server
npm install
npm run dev
cd client
npm install 
npm run dev
```
## Frontend Components

Details (no props) - The details page
<br>
<br>
Favorites (no props) - The favorites page
<br>
<br>
Home (no props) - The home page
<br>
<br>
Results (no props) - The search results page
<br>
<br>
Settings (no props) - The settings page
<br>
<br>
NavBar (no props) - The navigation bar
<br>
<br>
SearchBar (no props) - The search bar that is used in the NavBar
<br>
<br>
AuthModal (show, toggle, status, title) - The modal used for both logging in and signing up. The toggle prop is a function that changes the boolean value of show to show and hide the modal. The status prop is a boolean that is used to determine whether the user is logged in or not. The title prop is used to label the modal.
<br>
<br>
CustomModal ( colors, title, body, submitButton, closeButton, show, toggle) - The modal that is used for the account deletion confirmation message. It can be used for other purposes by passing an object (headerBackground: '#4B6D62', bodyBackground: '#F0F7F', footerBackground: '#4B6D62', title: '#ffffff', body: '#4B6D62') containing colors into the colors prop, the label into the title prop, the body text into the body prop,the submit button text into the submitButton prop, the close button text into the closeButton prop, the toggle function into the toggle prop, and the value of show into the show prop.
<br>
<br>
FoodCard (image, title, recipe) - The component used to display the food cards throughout the app. Put the image src into the image prop, the recipe name into the title prop, and the recipe itself into the recipe prop.
<br>
<br>
ProtectedRoute (no props) - Used to created a protected frontend route like the Settings page and Favorites page.
<br>
<br>
App (no props) - Contains all of the frontend routes using React Router
<br>

## Frontend Misc Files

axiosConfig - Contains the configuration for axios such as the base url. This should be imported anywhere you need to use axios in the frontend.
<br>
utils - Contains functions that are used multiple times throughout the app.
<br>

## Backend Routes

/recipes/search - Calls the Spoonacular complex search api endpoint and returns the results. Requires a query parameter called query that contains what you are searching for.
<br>
<br>
/recipes/random - Calls the Spoonacular random api endpoint to get random recipes and then returns the results.
<br>
<br>
/recipes/information - Calls the Spoonacular information api endpoint to get the recipe information then returns the results. Requires a query parameter called id that contains the recipe id.
<br>
<br>
/users/favorites - Gets the user's favorited recipes. Requires both a valid JWT and a query parameter containing the user id. Returns the user's favorites.
<br>
<br>
/users/register - Adds the user to the database after they submit the signup form. Requires both the username and password to be passed into the request body. Returns a success message.
<br>
<br>
/users/login - Finds the user in the database and creates a 10 day JWT. Requires the both the username and password to be passed into the request body. Returns a success message, the username, user id, and token.
<br>
<br>
/users/verify-jwt - Verfies whether the provided JWT is valid or not. Requires the JWT. Returns either the message "Valid JWT" or "Invalid JWT", a boolean value for whether they are authenticated or not, and the username and user id if it was a valid JWT.
<br>
<br>
/users/update - Changes the user's username or password or both. Requires a vslid JWT and a username or password or both to be passed into the request body. Returns a success message based on what was changed, a boolean of whether the user already exists or not, and the new username if it was changed.
<br>
<br>
/users/delete - Deletes a user from the database. Requires a valid JWT. Returns a success message.
<br>
<br>
/users/update/favorites - Updates the user's favorited recipes. Requires a valid JWT and the user id and recipe to be passed into the request body. Returns a success message.
<br>

## Models

user - Represents the user that is stored in the database.\
<br>

## Backend ENV Variables

PORT - Contains the port number for the server
<br>
<br>
CONNECTION_URL - Contains the Mongo connection url
<br>
<br>
SECRET_KEY - Contains the secret key used by the JWT
<br>
<br>
API_KEY - Contains the Spoonacular API key
<br>

## Scheduled Maintenance

- Backup the user database once at the end of every other week
- Delete users who have been inactive for 1 year or more 
- Manually test the entire application after each new feature implementation
- Update the Procfile if the location of the server changes
