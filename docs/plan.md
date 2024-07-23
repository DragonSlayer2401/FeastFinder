# Maintenance Plan

## Frontend Components
<br>
Details (no props) - The details page
<br>
Favorites (no props) - The favorites page
<br>
Home (no props) - The home page
<br>
Results (no props) - The search results page
<br>
Settings (no props) - The settings page
<br>
NavBar (no props) - The navigation bar
<br>
SearchBar (no props) - The search bar that is used in the NavBar
<br>
AuthModal (show, toggle, status, title) - The modal used for both logging in and signing up. The toggle prop is a function that changes the boolean value of show to show and hide the modal. The status prop is a boolean that is used to determine whether the user is logged in or not. The title prop is used to label the modal.
<br>
CustomModal ( colors, title, body, submitButton, closeButton, show, toggle) - The modal that is used for the account deletion confirmation message. It can be used for other purposes by passing an object (headerBackground: '#4B6D62', bodyBackground: '#F0F7F', footerBackground: '#4B6D62', title: '#ffffff', body: '#4B6D62') containing colors into the colors prop, the label into the title prop, the body text into the body prop,the submit button text into the submitButton prop, the close button text into the closeButton prop, the toggle function into the toggle prop, and the value of show into the show prop.
<br>
FoodCard (image, title, recipe) - The component used to display the food cards throughout the app. Put the image src into the image prop, the recipe name into the title prop, and the recipe itself into the recipe prop.
<br>
ProtectedRoute (no props) - Used to created a protected frontend route like the Settings page and Favorites page.
<br>
App (no props) - Contains all of the frontend routes using React Router
<br>

## Frontend Misc Files
<br>
axiosConfig - Contains the configuration for axios such as the base url. This should be imported anywhere you need to use axios in the frontend.
<br>
utils - Contains functions that are used multiple times throughout the app.
