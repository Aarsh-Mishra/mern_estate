import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  // Check if listing exists
  // Check if the user is the owner of the listing
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  // Check if the user is the owner of the listing
  // If the user is not the owner, return an error
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,

      req.body,

      { new: true }
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }

    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;

    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;

    // If offer is not defined or is 'false', set it to include both true and false
    // This allows us to filter listings based on the offer status
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    // If furnished is not defined or is 'false', set it to include both true and false
    // This allows us to filter listings based on the furnished status
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    // If parking is not defined or is 'false', set it to include both true and false
    // This allows us to filter listings based on the parking availability

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    // If type is not defined or is 'all', set it to include both 'sale' and 'rent'
    // This allows us to filter listings based on the type of listing (sale or rent)

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    // Extract search term, sort field, and order from query parameters
    // This allows us to filter listings based on the search term, sort by a specific field, and order the results

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      // Filter listings based on the search term, offer status, furnished status, parking availability, and type
      name: { $regex: searchTerm, $options: "i" },

      offer,

      furnished,

      parking,

      type,
    })

      .sort({ [sort]: order })

      .limit(limit)

      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
