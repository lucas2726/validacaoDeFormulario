let express = require("express")
let app = express()
let session = require("express-session")
let flash = require('express-flash')
let bodyParser = require('body-parser')
let cookieParser = require("cookie-parser")

app.set('view engine', 'ejs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("GT7GTRGT3GT23BG3BG"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash())

app.get("/", (req, res) => {

    let emailError = req.flash("emailError")
    let nomeError = req.flash("pontosError")
    let pontosError = req.flash("nomeError")
    let email = req.flash("email")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError
    email = (email == undefined || email.length == 0) ? "" : email

    res.render("index", { emailError, pontosError, nomeError, email: req.flash("email") })
})

app.post("/form", (req, res) => {
    let { email, nome, pontos } = req.body

    let emailError
    let nomeError
    let pontosError

    if (email == undefined || email == "") {
        emailError = "n pd ser vazio"
    }
    if (pontos == undefined || pontos < 20) {
        pontosError = "n pd ter menos de 20 pontos"
    }
    if (nome == undefined || nome == "") {
        nomeError = "O nome não pode estar vazio"
    }
    if (nome.length < 4) {
        nomeError = "o nome é muito pequeno"

    } if (emailError != undefined || pontosError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError)
        req.flash("pontosError", pontosError)
        req.flash("nomeError", nomeError)

        req.flash("email", email)

        res.redirect("/")
    } else {
        res.send("Show de bola!")
    }
})

app.listen(5678, (req, res) => {
    console.log("Servidor rodando!")
})