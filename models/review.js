//We are creating the model for the listing and then will export this SCHEMA to the app.js and will use it in the app.js file
const mongoose= require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt:  {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});


module.exports = mongoose.model("Review", reviewSchema)