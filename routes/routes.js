const express = require("express");
const router = express.Router();
const serivce = require("../services/services")

// router.route("/login").get( (req, res, next) => {
//     //checkValidationResult(req, res, next);
// }, serivce.);

// router.route("/sign-up").get(verifyAdmin.authenticateAdmin, (req, res, next) => {
//     checkValidationResult(req, res, next);
// }, adminDashboard.fetchUserInfo);

router.route("/products").get( (req, res, next) => {
    // checkValidationResult(req, res, next);
}, serivce.allProducts);


module.exports = router;