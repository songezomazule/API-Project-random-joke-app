
import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

/* To use css file in public folder. */
app.use(express.static("public"));

/* First page before requesting for a random joke */
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "A Joke will appear here!!" });
});

/* Use axios to be able to use the Random joke API */
app.post("/", async (req, res) => {
  try {
    const result = await axios.get("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,sexist,explicit&type=single");
    res.render("index.ejs", { content: JSON.stringify(result.data.joke) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

/* To make web display on local host */
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
