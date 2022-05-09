//#region
const express = require("express");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// (async function () {
//     var password = "toto"
//     bcrypt.hash(password, 32, async function (err, hash) {

//         const user1 = await prisma.users.create({
//             data: {

//                 name: "tutu",
//                 email: "tutu@totott1t21111222134.fr",
//                 password: hash
//             }
//         })
//     });
//     const foundedUser = await prisma.users.findUnique({
//         where: {
//             email: "tutu@totott1t21111222134.fr"
//         }
//     })
//     console.log(foundedUser);
//     if (!foundedUser) {
//         console.warn("sorry no item found")
//     }
//     var isValidUser = false;

//     bcrypt.compare(password, foundedUser?.password, function (err, result) {
//         isValidUser = result;
//         result && console.log("C'est trouvé")
//     })
// })();
//#endregion
// console.log(prisma)
var inventory = require("./inventory(1).json");
var bodyParser = require("body-parser");
const fs = require("fs");
const res = require("express/lib/response");
const req = require("express/lib/request");
const { Router } = require("express");
var app = express()
app.use(cors());
const port = "90"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/articles", (req, res) => {
    res.send(inventory.articles)
})
app.get("/articles/:id", (req, res) => {
    // console.log(req.params.id);
    var articlefound = inventory.articles.find((articles) => {
        // console.log(articles);
        if (articles.id == req.params.id) {

            // console.log(articles);
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
    // console.log(req.body);
    inventory.articles.push(newArticle)
    // console.log(inventory);
    fs.writeFileSync("./inventory(1).json", JSON.stringify(inventory))

    res.send("toto")
})
app.post("/login", async (req, res) => {



    let email = req.body.email
    let password = req.body.password
    // // htmlspecialchars

    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    })
    bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
            res.send(JSON.stringify({ user: user.name, userId: user.id, userEmail: user.email, userRole: user.role }))
        }
        else {
            console.log(err);
            res.send(JSON.stringify({ erreur: "mauvais mot de passe" }))
        }
    });

    // res.send({})

})

app.post("/inscription", (req, res) => {

    let name = req.body.name
    let email = req.body.email
    let password = req.body.password

    bcrypt.hash(password, 8, async function (err, hash) {

        const user1 = await prisma.users.create({
            data: {

                name: name,
                email: email,
                password: hash
            }
        })
    });
    res.send(JSON.stringify({ data: name, mail: email, pass: password }))

})
app.patch("/modifyarticle/:id", (req, res) => {
    // console.log("req.params.id", req.params.id);
    // console.log(req)
    const id = Number(req.params.id)
    const title = req.body.title

    let articleFound = {};
    // console.log(articles);
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