# EDM Tracker:
This app was created to provide users with a place to listen and keep track of the top EDM songs. Users can view and listen to the top songs in each EDM genre based on the number of plays. Members can favorite songs, create playlists, and search songs by category or key words.


## Stack:
In this project I chose to use EJS for front-end, Node.js, Sequelize, and Express for back-end and Bootstrap for styling. I chose EJS because it allowed me to add simple Javascript logic into my html. Out of all the frameworks/libraries in this stack I have the most experience with Express, node and sequelize. They were no-brainers for me as I have established my work flow heavily around Sequelize models and the Express API. Because my data is uniform in it's properties, I chose the Sequelize ORM over something more vague like Mongoose. I used good old Passport for user authentication because it works well with Express and allows you to send response messages to the user. Finally, I chose Bootstrap for styling because it's quick and easy to implement with a very clean feel. I also added some extra styling with css on top of Bootstrap. I use the Soundcloud API to display and play songs, it allows for easy addition of new songs and high sound quality.


## Upgrades: 
If I wanted to upgrade this app, there are a few changes I would make. I would replace EJS with React, or implement simple ajax calls. This is because, in the app’s current state, there are a few unnecessary page reloads that, if cleaned up with React, would make the app much faster and smoother. I would also use a different system to display and play songs. The Soundcloud API works for basic functionalities, but I would like to be able to give users more freedom that Soundcloud doesn't allow. Freedom to do things like trim, mix, and combine songs.


## tests:
``` 
npm test
```
