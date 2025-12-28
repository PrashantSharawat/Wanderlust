const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));
const session = require("express-session");
const flash = require("connect-flash");


// ------------------------------cookie-------------------------------

//signed cookie
app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "India", {signed: true});
    res. send("signed cookie sent")
});

app.get("/verify", (req, res) => {
    res. send(req.signedCookies);// for access signedcookie
});


// bheji gyi cookie
app.get("/getcookies", (req, res) => {
    res. cookie("greet", "namgste");
    res. cookie("madeIn", "India");
    res.send("sent you some cookies!");
});

// jitni bhi value hmari cookie k andr hoti h aa jati h
app.get("/", (req, res)=>{
    console.dir(req.cookies);
    res.send("Hi, I.am.root!");
});

app.get("/greet",(req,res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`Hi, ${name}`);
});




//--------------------------session-------------------------

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};


app.use(
    session(sessionOptions)
);
app.use(flash());



app.get("/reqcount", (req, res) => {
    res.send(`You sent a request ${req.session.count} times`);
});

//------normal registered succesfull---------

// app.get("/register", (req, res) => {
//     let { name = "anonymous" } = req. query;
//     req. session.name = name;
//     req. flash("success", "user registered successfully!");
//     res. redirect("/hello");
// });

// app.get("/hello", (req, res) =>{
//     res.send(`hello, ${req.session.name}`);
// });







//-------flash---after register---------

app.get("/register", (req, res) => {
    let { name = "anonymous" } = req. query;
    req. session.name = name;
    
    if(name === "anonymous") {
        req. flash("error", "user not registered");
    } else {
        req. flash("success", "user registered successfully!");
    }

    res.redirect("/hello");
});


app.get("/hello", (req, res) =>{

    res.locals.messages = req.flash("success");
    res. render("page.ejs", { name: req.session.name });
});



app.listen(3000,() =>{
    console.log("server is listening at 3000")
});