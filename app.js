import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// middleware for body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  let options = {
    bmivalue: "",
    weightvalue: "",
    heightvalue: "",
    bmitext: "",
  };
  res.render("index.ejs", options);
});

app.post("/", function (req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  var BMI = weight / (height * height);
  let options = {
    bmivalue: BMI,
    weightvalue: weight,
    heightvalue: height,
  };

  if (BMI <= 18.4) {
    options.bmitext = "You are Underweight ";
  } else if (BMI > 18.4 && BMI <= 24.9) {
    options.bmitext = "You are Normal ";
  } else if (BMI > 24.9 && BMI <= 39.9) {
    options.bmitext = "You are Overweight ";
  } else if (BMI > 39.5) {
    options.bmitext = "You are Obese";
  }
  res.render("index.ejs", options);
});
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
