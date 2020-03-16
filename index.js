//note eva! To start on a port open in terminal in the correct directory this file with node index.js --> Your app is listening on port 8080 (before close the terminal and restart & both terminal count studio and normal terminal - exit with control+c)
const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

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

//Get all data about by director // result in postman is empty - why??
app.get("/api/movies/:director", (req, res) => {
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

// Adds data for a new movie to our list of movies. not working in postman***
app.post("api/movies", (req, res) => {
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

// Deletes a movie from our list by ID - not working in postman****
app.delete("/api/movies/:id", (req, res) => {
  let movies = movies.find(movies => {
    return movies.id === req.params.id;
  });

  if (movies) {
    movies = movies.filter(function(obj) {
      return obj.id !== req.params.id;
    });
    res.status(201).send("Movie " + req.params.id + " was deleted.");
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

/*******************-----not yet done for movies:

// Update the "grade" of a student by student name/class name
app.put("/students/:name/:class/:grade", (req, res) => {
  let student = students.find(student => {
    return student.name === req.params.name;
  });

  if (student) {
    student.classes[req.params.class] = parseInt(req.params.grade);
    res
      .status(201)
      .send(
        "Student " +
          req.params.name +
          " was assigned a grade of " +
          req.params.grade +
          " in " +
          req.params.class
      );
  } else {
    res
      .status(404)
      .send("Student with the name " + req.params.name + " was not found.");
  }
});

// Gets the GPA of a student
app.get("/students/:name/gpa", (req, res) => {
  let student = students.find(student => {
    return student.name === req.params.name;
  });

  if (student) {
    let classesGrades = Object.values(student.classes); // Object.values() filters out object's keys and keeps the values that are returned as a new array
    let sumOfGrades = 0;
    classesGrades.forEach(grade => {
      sumOfGrades = sumOfGrades + grade;
    });

    let gpa = sumOfGrades / classesGrades.length;
    console.log(sumOfGrades);
    console.log(classesGrades.length);
    console.log(gpa);
    res.status(201).send("" + gpa);
    //res.status(201).send(gpa);
  } else {
    res
      .status(404)
      .send("Student with the name " + req.params.name + " was not found.");
  }
});
*/

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
