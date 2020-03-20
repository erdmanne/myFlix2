//note eva! To start on a port open in terminal in the correct directory this file with node index.js --> Your app is listening on port 8080 (before close the terminal and restart & both terminal count studio and normal terminal - exit with control+c)
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

//list of movies
let movies = [
  {
    id: 1,
    title: "King Lion",
    genre: "family",
    description: "good to watch with your family",
    director: "Walt Disney"
  },

  {
    id: 2,
    title: "Arielle",
    genre: "family",
    description: "good to watch with your family",
    director: "Walt Disney"
  },

  {
    id: 3,
    title: "101 Dalmatiner",
    genre: "drama",
    description: "good to watch with your family",
    director: "Cruella"
  }
];

//list of users
let user = [
  {
    id: 1,
    username: "ee",
    password: "password123",
    email: "example@gmail.com",
    date_of_birth: "May 12, 1989",
    Favorites: {}
  }
];

// List of Favorites

let Favorites = [
  {
    title: "Toy Story",
    genre: "family",
    description: "good to watch with your family",
    director: "Walt Disney"
  }
];

// Gets the list of data about ALL movies = working/done
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Gets the data about a single movie, by title = working/done
app.get("/api/movies/:title", (req, res) => {
  res.json(
    movies.find(movies => {
      return movies.title === req.params.title;
    })
  );
});

//Get all data about by director // working
app.get("/api/movies/directors/:director", (req, res) => {
  res.json(
    movies.find(movies => {
      return movies.director === req.params.director;
    })
  );
});

app.get("/api/genre/:title", function(req, res) {
  console.log(req.params.title);
  const movie = movies.filter(
    movie => movie.director.toLowerCase() === req.params.director.toLowerCase()
  );
  res.send(movie);
});

// Adds data for a new movie to our list of movies. working on postman
app.post("/api/movies", (req, res) => {
  let newMovie = req.body;

  if (!newMovie.title) {
    const message = 'Missing "title" in request body';
    res.status(400).send(message);
  } else {
    newMovie.id = uuid.v4();
    movies.push(newMovie);
    res.status(201).send(newMovie);
  }
});

// Deletes a movie from their fav. list by ID - not working in postman****
app.delete("/api/users/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  let movie = movies.find(movies => {
    return movies.id === movieId;
  });

  if (movie) {
    movies.filter(function(obj) {
      return obj.id !== movieId;
    });
    res.status(201).send("Movie " + req.params.id + " was deleted.");
  } else {
    res.status(401).send("Movie with id" + req.params.id + " was not found");
  }
});

// Return data about genre by name of genre

app.get("/api/genre/:title", function(req, res) {
  console.log(req.params.title);
  const movie = movies.filter(
    movie => movie.genre.toLowerCase() === req.params.title.toLowerCase()
  );
  res.send(movie);
});

// Adds data for a new user to our list of user. allow new user to register- working
app.post("/api/user", (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    user.push(newUser);
    res.status(201).send(newUser);
  }
});

//allow user to update user information -->not working in postman****
app.put("/api/user/:username", (req, res) => {
  res.send("Successful user information updated");
});

//delete user information - deregister by ID
app.delete("/api/user/:username", (req, res) => {
  let user = User.find(user => {
    return user.username === req.params.username;
  });
  if (user) {
    User.filter(function(obj) {
      return obj.username !== req.params.username;
    });
    res
      .status(201)
      .send(req.params.username + " has been removed from registry .");
  }
});

// Add movies to user's list of favorites
app.post("/api/user/:username/favorites", (req, res) => {
  let newFavorite = req.body;

  if (!newFavorite.title) {
    const message = "Missing movie title in request body";
    res.status(400).send(message);
  } else {
    newFavorite.id = uuid.v4();
    Favorites.push(newFavorite);
    res.status(201).send(newFavorite);
  }
});

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
