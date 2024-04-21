import express from "express"
import bodyParser from "body-parser"
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// middleware for body-parser
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/public/bmiCalculator.html")
})

app.post("/" , function(req,res){

  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  var BMI = weight/(height*height);

  if (BMI <= 18.4){
    res.send("You are Underweight and your BMI is "+BMI)
  }
  else if (BMI > 18.4 && BMI <= 24.9) {
    res.send("You are Normal and your BMI is "+BMI)
  }
  else if (BMI > 24.9 && BMI <= 39.9) {
    res.send("You are Overweight and your BMI is "+BMI)
  }
  else if (BMI >39.5) {
    res.send("You are Obese and your BMI is "+BMI)
  }
})
app.listen(3000,function(){
  console.log("server is running on port 3000")
})
