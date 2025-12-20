const express = require("express");
const { 
    getEmployees, 
    getEmployeeCustomerDetails, 
    getAllData, 
    getOpenTickets,
    getClosedTickets,
    getTotalTickets,
    insertEmployeeData
} = require("../controllers/adminController");


const router = express.Router();
router.get("/get-all-data",getAllData)
router.get("/get-open-tickets",getOpenTickets)
router.get("/get-close-tickets",getClosedTickets)
router.get("/get-total-tickets",getTotalTickets)
router.get("/get-employees", getEmployees);
router.post("/create-employee", insertEmployeeData);
router.get("/employee/:id/customers", getEmployeeCustomerDetails);

module.exports = router;