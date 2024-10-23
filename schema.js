const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.alternatives().try(
            Joi.string().uri(), //Alow image to be just a URL string
            Joi.object({
                filename: Joi.string().default('default.jpg'),
                url: Joi.string().uri().default('https://wallpaperaccess.com/full/1218437.jpg')
            })
        ).allow("", null)
    }).required()
});

// module.exports = {listingSchema};


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});