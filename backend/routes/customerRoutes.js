const express = require("express");
const { collectCustomerData } = require("../controllers/customerController");


const router = express.Router();

router.get("/data", collectCustomerData);

module.exports = router;