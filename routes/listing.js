const express = require("express");
const router = express.Router();
//IMPORTING THE LISTING SCHEMA 
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
//IMPORTING LISTING CONTROLLER
const listingController = require("../controller/listing.js");
//REQUIURE MULTER to use for parsing the image files
const multer  = require('multer');
//REQUIRING STORAGE FROM CLOUD CONFIGURATION
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get( wrapAsync(listingController.index))          //INDEX ROUTE (/listings)
.post(isLoggedIn, upload.single("listing[image]"), validatelisting, wrapAsync(listingController.createListings));       //CREATE ROUTE
// .post(upload.single("listing[image]"), (req, res)=>{
//     console.log("Received a POST request");  // Log for debugging
//     console.log("FILE: -----------", req.file);
//     console.log("BODY: -----------", req.body);
//     res.send(req.file);
// });

//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListings))                                                  //SHOW ROUTE
.put( isLoggedIn, isOwner, validatelisting, wrapAsync(listingController.updateListing))              //UPDATE Route
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));                      //DELETE ROUTE for listings       


//UPDATE (EDIT AND UPDATE) Route
//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;

