const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

mongoose.connection.collections["recipes"].drop(function(err) {
  console.log("collection dropped");
});

Recipe.insertMany(data)
  .then(recipes => {
    console.log(recipes);
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(recipe => console.log("recipe update!", recipe))
      .catch(err => err);
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(recipe => console.log("recipe delete"))
      .catch(err => err);
    Recipe.updateOne({ title: "Tortilla de patata" }, { level: "Amateur Chef" })
      .then(recipe => console.log("recipe update!", recipe))
      .catch(err => err);

    Recipe.deleteOne({ title: "Chocolate Chip Cookies" })
      .then(recipe => console.log("recipe update!", recipe))
      .catch(err => err);
  })
  .catch(err => err);

Recipe.create(
  {
    title: "Tortilla de patata",
    level: "Easy Peasy",
    ingredients: ["eggs", "potatos", "onion", "salt", "olive oil"],
    cuisine: "Spanish",
    dishType: "Dish",
    duration: 60,
    creator: "El Rey de las Tortillas"
  },
  function(err, recipe) {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log("The user is saved and its value is: ", recipe);
    }
  }
);

mongoose.connection.close();
