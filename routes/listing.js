const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listigSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })



const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};





// router.post("/",upload.single('listing[image]'), (req,res) => {
//   res.send(req.file);
// })



// index route
router.get("/",listingController.index);




// 2--> Create Route---->New Route

// A----> new route[new form]
router.get("/new", isLoggedIn, listingController.renderNewForm);



//      *---->create route[form submit]
router.post(
  "/",
  isLoggedIn,
  upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);



// 1--> Show Route
router.get(
  "/:id", wrapAsync(listingController.showListing ));


// 3--> Update Route

// B---->Edit route[Edit form]
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

// *---update route[ Edit form submited]
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  wrapAsync(listingController.updateListing)
);

//  4--> Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.deleteListing)
);


module.exports = router;