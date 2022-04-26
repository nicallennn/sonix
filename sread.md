# sonix readme

---

## Overview

Sonix is a sound design recipe cookbook. The project is a web application built with node, express, mongodb, mongoose on the backend, and react, redux, sass, firebase on the front end,

Sonix allows users to create and browse sound design recipes, which consist of an audio preview, ingredients, and the method to create the sound. Audio preview files are uploaded to firebase.

---

## Running the application

- Clone the git repo and run npm install in both the client and server directories.
- You must have mongodb running on your machine, the project uses a database called sonix and has two collections, users and recipes.
- There is a script ‘mock-data-script.js’ to produce mock data for the application. The json file created by this script can be added to mongodb using mongodb compass. Note the data created is rough at best and will randomly select audio files so many recipes may have the same audio preview.
- Run the server first using npm start inside the server directory, the server will start running on port 3001.
- Run the client using npm start inside the client directory, the client will start running on port 3000.

---

## Screenshots of sonix in action

1. Dashboard - entry point for the application

![dashboard_unauth.png](sonix%20readme%207980150bb61c471ba5c9a2bf926a5b74/dashboard_unauth.png)

1. Recipe - view a sound design recipe
    
    ![recipe.png](sonix%20readme%207980150bb61c471ba5c9a2bf926a5b74/recipe.png)
    

1. Create - create a sound design recipe
    
    ![create_recipe.png](sonix%20readme%207980150bb61c471ba5c9a2bf926a5b74/create_recipe.png)
    

1. Profile - view a users profile
    
    ![profile.png](sonix%20readme%207980150bb61c471ba5c9a2bf926a5b74/profile.png)
    

---

## Known Issues

- Category search / Search - bug showing correct number of likes if recipe liked/unliked in search pages, as these recipes are not stored in the global store - they are updated on the server so will update on page refresh, either needs a way to update these recipes or needs to be stored in global store so value changes are reflected.
- Profile - clicking the titles of the recipes category in profile, i.e. Recipes/Like Recipes, also links to the category search page as this page utilises the same components as the dashboard, this could route to a search through users own recipes or liked recipes, or could be disabled from routing.
- Navbar - need to implement a mobile navbar, the rest of the application is mostly responsive but the navbar will break on small screens.