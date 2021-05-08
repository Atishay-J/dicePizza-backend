const faker = require("faker");

faker.seed(123);

const data = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  price: faker.commerce.price(),
  isVeg: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),

  vegIngredients: faker.random.arrayElement(["Paneer", "Veggies"]),
  nonVegIngredients: faker.random.arrayElement(["Chicken", "Non-veg"]),
  name: faker.random.arrayElement([
    "Maximus Prime",
    "Maharaja",
    "Indian Twist",
    "Smokey",
    "Spanish",
    "Exotica",
    "Double",
  ]),
  generalIngredients: faker.random.arrayElement([
    "Margarita",
    "Mozzarella",
    "Cheese",
    "Corn",
    "Olives",
    "Tikka",
  ]),
  verbs: faker.random.arrayElement([
    "Burst",
    "Fresh",
    "Peppy",
    "Overload",
    "Delight",
    "Feast",
  ]),
  offer: faker.random.arrayElement([
    "Save 50%",
    "70% bonanza",
    "Republic Day Sale",
  ]),
  pizzaImages: faker.random.arrayElement([
    "https://bit.ly/3uOfDNM",
    "https://bit.ly/3v14Ksh",
    "https://bit.ly/2Q8I9Lh",
    "https://bit.ly/3mQnPdA",
    "https://bit.ly/3sudLbG",
    "https://bit.ly/3tnACa5",
  ]),
}));

module.exports = data;

// FOR THE PR ISSUE, WILL CLEAN LATER
