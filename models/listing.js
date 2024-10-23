//We are creating the model for the listing and then will export this SCHEMA to the app.js and will use it in the app.js file
const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

//Schema for the listings
const listingSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default.jpg"
        },
        url: {
            type: String,
            default: "https://www.hauteresidence.com/wp-content/uploads/2019/03/imagereader-20.aspx_-4.jpeg"
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }
});

//Mongoose Middleware for deleting the reviews associated with a listing once the listing is deleted
listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});


//CREATING MODEL;
const Listing= mongoose.model("Listing", listingSchema);

//EXPORTING THE MODEL TO THE app.js file
module.exports= Listing;