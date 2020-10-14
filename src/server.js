const express = require("express");
const app = express();
const fetch = require("node-fetch");
var cors = require("cors");

try {
  function sendQuery(query) {
    return new Promise((resolve, reject) => {
      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=ed5855d1&s=${query}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  }
  app.use(cors());

  app.get("/:query", (req, res) => {
    const urlArr = req.url.split("/");
    sendQuery(urlArr[1])
      .then((data) => {
        if (data.Response == "False") {
          res.status(404).send("Not found");
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  });

  const port = 5000;
  app.listen(port, () => console.log("Server started on port", port));
} catch (err) {
  console.log(err);
}
