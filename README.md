# Wanderlust

## Overview
The **Wanderlust App** is a simple application built with **Node.js**, **Express**, and **MongoDB** to list hotels/villa for booking. This application supports basic CRUD (Create, Read, Update, Delete) operations with an intuitive interface powered by **EJS** templates. Users can create hotel listings (when logged in), view all listings, edit listing details (that are created by them), check the location of the hotel, write a comment and give rating (when logged-in).

---

## Features
- **Sign-up/Log-in**: User can sign-up using their email and can create a password using a username of their choice.
- **Create New Listing**: Add hotels/vialls with a title, description, and image, price, country, Location.
- **View All listings**: See a list of all Hotels/villas .
- **Edit Listing Details**: Modify the Hotels/Villas details.
- **Comment/Ratings**: Logged-in users can write comments and give ratings for the listings
- **Delete Listing**: The owner of the listing can delete the listing.
- **Error Handling**: Handles invalid routes and operations gracefully with error messages.

---

## Technologies Used
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript)
- **Utilities**: `ejs-mate` for layout templates, `method-override` for HTTP verbs, `Joi` for validation, `MVC (Model, views and Controller)` for strutured website building, `MapBox` for showing the location of listing, `Cloudinary` for image upload.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally or a cloud MongoDB instance
- Basic knowledge of terminal/command line

### Steps
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/Wanderlust.git
    cd Wanderlust
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up the Database**:
   Ensure MongoDB is running on your machine or modify the connection string in `app.js`:
   ```javascript
   const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
   ```

4. **Initialize the Database**:
    (Optional) Add initial data to your database using the `init/index.js` script:
    ```bash
    node init/index.js
    ```

5. **Run the Application**:
    ```bash
    npm app.js
    ```

6. **Access the App**:
   Open your browser and navigate to:
   ```
   http://localhost:8080/listings
   ```

---

## File Structure
```
Wanderlust/
├── controller/
│   └── listing.js
│   └── review.js
│   └── user.js
├── models/
│   └── listing.js       # Mongoose schema for listing
│   └── review.js        # Mongoose schema for review
│   └── user.js          # Mongoose schema for User
├── public/
│   └── css       # Static assets (CSS, images, etc.)
│       └── styles.css       # Static assets (CSS)
│       └── rating.css       # Static assets (CSS for rating)
│   └── js
│       └── map.js           # JavaScript of the MapBox
│       └── script.js
├── routes/
│   └── listing.js       # Routes for listing
│   └── review.js        # Routes for review
│   └── user.js          # Routes for User
├── views/
│   ├── layouts/         # EJS layouts for consistent UI
│   ├── listings/        # EJS templates for listing operations
│   ├── includes/        # EJS templates for footer & navbar
│   ├── users/           # EJS templates for user login & signup
│   └── error.ejs        # Error page
├── utils/
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error wrapper
├── init/
│   └── index.js         # Script to initialize sample data
├── app.js               # Main application logic
└── package.json         # Project metadata and dependencies
```

---

## Usage Instructions
### Add a New Task
1.Navigate to `/listings/signup`.
  - **Username**: Enter a username.
  - **Email**: Enter your email.
  - **Password**: Choose a strong password.
2. Navigate to `/listings/new`.
3. Fill in the form fields:
   - **Title**: Enter a descriptive title.
   - **Description**: Add relevant details about the task.
   - **Price**: Give a Price to the Hotel/Villa.
   - **Image**: Provide an image for the Listing
   - **Location**: Provide the location. 
4. Submit the form to create the Listing.

### View All Listings
1. Go to `/listings`.
2. Browse the list of hotels/villas with details displayed.

### Edit a Listing
1. Click the "Edit" button.
2. Update the form fields and submit.

### Delete a Listing
1. Click the "Delete" button next to the listing.
2. The listing will be removed from the list.

---

## Error Handling
- **404 Errors**: Displayed when a route or listing is not found.
- **Validation Errors**: Ensures form submissions meet requirements.
- **Custom Errors**: Handled using the `ExpressError` class.

---

## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this software.

---

##Live Website Link:
You can check out the live project here: https://wanderlust-n3qp.onrender.com/listings

- **GitHub**: [your-username](https://github.com/your-username)

--- 

Enjoy managing your tasks! 🚀
