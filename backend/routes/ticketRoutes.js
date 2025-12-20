const express = require("express");
const {
  getAllTickets,
  addNewTickets,
  updateTickets,
  totalTickets,
  getAllCompanyNamedTickets,
  viewPending,
  getTicketDetails,
  createCustomers,
} = require("../controllers/ticketController");

const router = express.Router();

router.get("/tickets", getAllCompanyNamedTickets);
router.get("/get-all-tickets", getAllTickets);
router.get('/total-tickets',totalTickets)
router.get('/view-pending',viewPending)
router.get('/get-ticket-details',getTicketDetails)
router.post("/add-ticket", addNewTickets);
router.put("/update-ticket", updateTickets);
router.post('/create-customers',createCustomers)


module.exports = router;
