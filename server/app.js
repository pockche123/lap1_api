const express = require("express");
const app = express();
let fruits = require("./fruits.json");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Are you reddy!", description: "For fruits" });
});

app.get("/fruits", (req, res) => {
  res.status(200).send(fruits);
});

app.get("/fruits/:id", (req, res) => {
  const idx = req.params.id - 1;
  const fruit = fruits[idx];

  if (!fruit) {
    res.status(404).send({ error: `Fruit with id ${req.params.id} not found` });
  } else {
    res.send(fruit);
    res.status(200).send(fruit);
  }
});

app.post("/fruits", (req, res) => {
  const fruit = req.body;
  console.log(fruits);

  const lastFruit = fruits[fruits.length - 1];
  const lastId = lastFruit ? lastFruit.id + 1 : 1;
  fruit.id = lastId;

  if (fruit.name) {
    fruits.push(fruit);
    res.status(201).send(fruit);
  } else {
    res.status(422).send({ error: "you need a name to create a fruit" });
  }
});

app.patch("/fruits/:id", (req, res) => {
  const updatedFruit = req.body;
  console.log(req.body);
  const fruitId = parseInt(req.params.id);

  const fruitMatch = fruits.find((fruit) => fruit.id === fruitId);

  if (fruitMatch) {
    if (updatedFruit.name) {
      fruitMatch.name = updatedFruit.name;
      res.status(200).send(fruitMatch);
    } else {
      res.status(422).send({ error: "You need to specify the name" });
    }
  } else {
    res.status(404).send({ error: "cannot update missing fruit" });
  }
});

app.delete("/fruits/:id", (req, res) => {
  const fruitId = parseInt(req.params.id);

  const fruitMatch = fruits.find((fruit) => fruit.id === fruitId);

  if (fruitMatch) {
    fruits = fruits.filter((fruit) => fruit.id !== fruitId);
    res.status(204).send();
  } else {
    res.status(404).send("Fruit not found");
  }
});

module.exports = app;
