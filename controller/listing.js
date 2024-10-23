const Listing = require("../models/listing.js");
require('dotenv').config();
//GEOCODING
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//INDEX ROUTE
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

//RENDER THE FORM FOR ADDING NEW LISTING
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

//CREATE THE LISTING
module.exports.createListings = async (req, res, next) => {
    //GEOCODING
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
    
    console.log(response.body.features[0].geometry);
    //GEOCODING ENDS


    console.log(req.body);
    const newListingData = req.body.listing;

    //If the image is submitted as a string, create an object structure for it
    if (typeof newListingData.image === "string") {
        newListingData.image = {
            filename: "default.jpg",
            url: newListingData.image
        };
    }

    const newListing = new Listing(newListingData);
    //Saving the data of the owner
    newListing.owner = req.user._id;
    
    //saving the geometry(coordinates) inside the listing data
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    //Use req.flash()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//SHOW ROUTE
module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing does not exists");
        res.redirect("/listings");
    }

    console.log(listing);

    res.render("listings/show.ejs", { listing });
}


//RENDER EDIT FORM
module.exports.renderEditForm = async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing does not exists");
        res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
}

//UPDATE LISTING DETAILS
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Listing Updated!");

    res.redirect("/listings");
}


//DESTROY LISITNG 
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");

}