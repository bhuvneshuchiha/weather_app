const express = require("express");
const { locationSchema } = require("./types");
const app = express();
const axios = require("axios");
app.use(express.json());

app.post("/", (req, res) => {

  const payload = req.body;
  console.log(payload)
  const parsedPayload = locationSchema.safeParse(payload)
  console.log(parsedPayload)

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong inputs, the city name should be more than 2 letters"
    })
    return;
  } else {
    const location = parsedPayload.location;
    axios.get(`https://open-weather13.p.rapidapi.com/city/${location}`, {
      headers: {
        'X-RapidAPI-Key': '6957db3ca9msh311ccbe5aa3b601p1e49b6jsnf30ca4a5c547',
        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
    })
      .then((response) => {
        res.json({
          "The weather is :": response.data
        })
      })
  }
})


app.listen(3000);
