//EXPRESS
const express= require("express");
const app=express();


// const wrapAsync = require("./utils/wrapAsync.js");
// const ExpressError= require("./utils/ExpressError.js");
// const {listingSchema, reviewSchema} = require("./schema.js");
// const Review = require("./models/review.js");

//REQUIRING THE METHOD OVERRIDE package so that we can use the PUT REQUEST with the update route
const methodOverride= require("method-override");
app.use(methodOverride('_method'));
//using URLENCODED so that we can parse the data
app.use(express.urlencoded({extended: true}));
//EJS SETUP
const path= require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Requiring and using the ejs-mate for templating 
const ejsMate= require('ejs-mate');
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//IMPORTING THE LISTING SCHEMA 
const Listing= require("./models/listing.js");
//MONGOOSE
const mongoose=require("mongoose");
//Requiring LISTINGS ROUTES
const listingRouter = require("./routes/listing.js");
//Requiring REVIEWS ROUTE
const reviewRouter = require("./routes/review.js");
//Requiring USER ROUTE
const userRouter = require("./routes/user.js");
//Require EXPRESS-SESSION
const session = require("express-session");
//Requiring CONNECT-MONGO
const MongoStore = require('connect-mongo');
//Require CONNECT-FLASH to send flash messages
const flash = require("connect-flash");

//USER MODEL - PASSPORT - LOCAL-PASSPORT
const passport= require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

require('dotenv').config();

//USING MONGO ATLAS AS THE DATABASE
const dbUrl = process.env.ATLASDB_URL;


app.listen(8080, ()=>{
    console.log("server is listening to port 8080");
});

//MONGODB SESSION STORE
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", error);
});
//SESSION-OPTIONS
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};


// app.get('/', (req, res)=>{
//     res.send("Hi! I am root");
// });


//Use EXPRESS-SESSION
app.use(session(sessionOptions));
//Use FLASH
app.use(flash());

//INITIALIZING PASSPORT
app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new localStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//Middleware for res.flash using res.local
app.use((req, res, next)=>{
    // console.log("Flash Message Success");
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//DEMO USER
app.get("/demouser", async (req, res)=>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "delta-student"
    });

    let registeredUser = await User.register(fakeUser, "helloworld");
    res.send(registeredUser);
});


//REQUIRE AND USE LISTINGS ROUTE + REVIEWS ROUTE
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
//LISTING ROUTE & REVIEWS ROUTE
//USER ROUTES
app.use("/", userRouter);


//DATABASE CONNECTION SETUP 
// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(dbUrl);
}

//CALLING THE main() function
main()
    .then(()=>{
        console.log("connected to DataBase.");
    })
    .catch((err)=>{
        console.log(err);
    });


// app.all("*", (req, res, next) => {
//     next(new ExpressError(404, "Page not found."));
// });

//Error Handler for the CREATE ROUTE
app.use((err, req, res, next)=>{
    let {statusCode = 500, message = "Something went wrong"}= err;
    // res.status(statusCode);
    // res.send(message);
    res.render("error.ejs", {err});
});
 

//Use the static files 
app.use(express.static(path.join(__dirname, "/public")));

