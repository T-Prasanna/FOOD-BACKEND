global.foodData = require('./db')(function call(err, data, CatData) {
  if (err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

const cors = require("cors");
const express = require("express");
const app = express();

// ✅ Use Render's dynamic port OR fallback to 5000 locally
const port = process.env.PORT || 5000;

// ✅ Allow both local and Render frontend
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://food-web-fusc.onrender.com"   // 👈 replace with your actual Render frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/auth", require("./Routes/Auth"));

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
