if(process.env.NODE_ENV != "prodection"){
require('dotenv').config();
};
console.log(process.env.SECRET)


const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const path = require("path");
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listigSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const session = require("express-session");
// const MongoStore = require("connect-mongo");
const { default: MongoStore } = require("connect-mongo");

const flash = require("connect-flash");

const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");







// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// const checkToken = (req, res, next) => {
//   let { token } = req.query;
//   if (token === "giveaccess") {
//     next();
//   }
//   throw new ExpressError(401, "ACCESS .DENIED!");
// };



// -------------------session--------------------


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const session0ptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 *24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};
// console.log("MongoStore object:", MongoStore);--------for error mongo.create is not a function

app.use(session(session0ptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






// --------------authentication---after store---------------

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student"
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });





// // ----------joi validate --from server side  --ye function niche middlware ki thra aayega -->validateListing
// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if (error) {
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   } else {
//     next();
//   }
// };






//-------------------flash------------------------

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  console.log( res.locals.success);
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})







// router 

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);












// test Listing route
// app.get("/testListing", async (req, res) =>{
//     let sampleListing = new Listing({
//         title: "My New Villa",
//         description: "This is a beautiful villa",
//         price: 1200,
//         location: "Calangute,Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("successful test of listing save");
// });



// -----------------error middleware------------------

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// custom error handling
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  // res.status(statusCode).send(message);
  res.render("error.ejs", { message });
});





app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
