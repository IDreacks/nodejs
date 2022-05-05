const express = require("express");
const cors = require("cors");
var inventory = require("./inventory(1).json");
var bodyParser = require("body-parser");
const fs = require("fs");
var app = express()
app.use(cors());
const port = "90"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/articles", (req, res) => {
    res.send(inventory.articles)
})
app.get("/articles/:id", (req, res) => {
    console.log(req.params.id);
    var articlefound = inventory.articles.find((articles) => {
        console.log(articles);
        if (articles.id == req.params.id) {

            console.log(articles);
            return articles
        }
    })
    res.send(articlefound)

})
// app.patch("/modifyarticle/:id", (req, res) => {
//     fs.writeFileSync("./inventory(1).json", JSON.stringify(inventory))
// })
app.post("/addarticle", (req, res) => {
    let newArticle = req.body;
    console.log(req.body);
    inventory.articles.push(newArticle)
    console.log(inventory);
    fs.writeFileSync("./inventory(1).json", JSON.stringify(inventory))

    res.send("toto")
})

app.patch("/modifyarticle/:id", (req, res) => {
    console.log("req.params.id", req.params.id);
    console.log(req)
    const id = Number(req.params.id)
    const title = req.body.title

    let articleFound = {};
    console.log(articles);
    inventory.articles.filter((articles) => {
        if (articles.id === id) {
            articles.title = title
            articleFound = articles
        }
        inventory.articles.push(articles)

    })
    fs.writeFileSync("./inventory(1).json", JSON.stringify(inventory.articles))


    res.send("toto")
})


app.listen("90", () => {
    console.log("server running " + port)
})