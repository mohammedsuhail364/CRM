const User = require("../models/User");
const Customer = require("../models/CustomerData");

const getAllCompanyNamedTickets = async (req, res) => {
  try {
    const { userEmail, company } = req.query; // Get userEmail and company from query params

    if (!userEmail || !company) {
      return res.status(400).json({
        success: false,
        message: "User email and company name are required",
      });
    }

    // Fetch user from the database
    const user = await User.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the company exists in the tickets object
    if (!user.tickets || !user.tickets[company]) {
      return res.status(200).json({
        success: true,
        message: `No tickets found`,
      });
    }

    return res.status(200).json({
      success: true,
      company,
      tickets: user.tickets[company], // Return only the company's tickets
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// get total tickets
const totalTickets = async (req, res) => {
  const { userEmail } = req.query;
  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required",
    });
  }
  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  const totalTickets = user.totalTickets;
  return res.status(200).json({
    success: true,
    totalTickets,
  });
};

// add tickets
const addNewTickets = async (req, res) => {
  const { userEmail, newTicket, company } = req.body;

  if (!userEmail || !company || !newTicket) {
    return res.status(400).json({
      success: false,
      message: "User email, company, and ticket details are required",
    });
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  console.log(typeof user.tickets);

  if (typeof user.tickets !== "object" || Array.isArray(user.tickets)) {
    user.tickets = {}; // Ensure tickets is an object (not an array)
  }
  console.log(user.tickets[company]);

  if (!user.tickets[company]) {
    user.tickets[company] = []; // Initialize an array for the company if it doesn't exist
  }
  user.totalTickets++;
  user.tickets[company].push(newTicket); // Add the new ticket

  // await user.save(); // Save updated user document
  user.markModified("tickets");

  await user.save();
  // console.log(user.tickets);

  return res.status(200).json({
    success: true,
    message: "Successfully added the ticket",
  });
};

// update tickets
const updateTickets = async (req, res) => {
  const { company, removeTicketNo, userEmail, solution } = req.body;
  if (!userEmail || !removeTicketNo || !userEmail || !solution) {
    return res.status(400).json({
      success: false,
      message:
        "User email, remove Ticket no , company and solution details are required",
    });
  }

  const user = await User.findOne({ userEmail });
  const currentCompany = user.tickets[company];

  if (!currentCompany || !Array.isArray(currentCompany)) {
    throw new Error("No tickets found for the specified company");
  }

  // Ensure `removeTicketNo` is correctly used to find the ticket
  const changeSolution = currentCompany.find(
    (ticket) => ticket.ticketNumber === removeTicketNo
  );
  changeSolution.solution = solution;
  changeSolution.solvedDate = new Date();

  user.markModified("tickets");

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Successfully added the solution",
  });
};

// get all tickets (all company)
const getAllTickets = async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required",
    });
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const userTickets = user.tickets;
  const allTickets = [];

  if (userTickets && Object.keys(userTickets).length > 0) {
    // Step 1: Fetch all company info in parallel
    const companyNames = Object.keys(userTickets);
    const companyDataMap = {};

    await Promise.all(
      companyNames.map(async (company) => {
        const customer = await Customer.findOne({ company });
        companyDataMap[company] = customer || null;
      })
    );

    // Step 2: Attach company data to each ticket
    for (const company of companyNames) {
      const ticketList = userTickets[company];
      const customer = companyDataMap[company];

      ticketList.forEach((ticket) => {
        allTickets.push({
          ...ticket.toObject?.() ?? ticket,
          companyDetails: customer,
        });
      });
    }

    return res.status(200).json({
      success: true,
      tickets: allTickets,
    });
  } else {
    return res.status(200).json({
      success: true,
      tickets: [],
      message: "No tickets found for this user",
    });
  }
};

const viewPending = async (req, res) => {
  const { userEmail, ticketNumber } = req.query;

  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email and ticket Number is required",
    });
  }

  // Fetch user from the database
  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const userTickets = user.tickets;
  let companyName = "";
  const ticketNum = Number(ticketNumber); // Convert to number

  for (const company in userTickets) {
    for (const ticketObj of userTickets[company]) {
      if (ticketObj.ticketNumber === ticketNum) {
        companyName = company;
        break; // Stop searching once found
      }
    }
    if (companyName) break; // Exit the outer loop as well
  }

  if (!companyName) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  return res.status(200).json({
    success: true,
    companyName,
  });
};

const getTicketDetails = async (req, res) => {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({
      success: false,
      message: "User email is required",
    });
  }

  const user = await User.findOne({ userEmail });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const tickets = [];
  let openTickets = 0;
  let closedTickets = 0;
  const companyFrequency = {};

  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const userTickets = user.tickets;

  if (userTickets && Object.keys(userTickets).length > 0) {
    for (const company in userTickets) {
      const ticketList = userTickets[company];

      ticketList.forEach((ticket) => {
        if (ticket.date === today) {
          tickets.push(ticket);
          openTickets++;

          if (ticket.solution && ticket.solution.trim() !== "") {
            closedTickets++;
          }

          // Count company frequency only for today's tickets
          companyFrequency[company] = (companyFrequency[company] || 0) + 1;
        }
      });
    }

    // Find the most frequent company among today's tickets
    let mostFrequentCompany = null;
    let maxCount = 0;

    for (const company in companyFrequency) {
      if (companyFrequency[company] > maxCount) {
        maxCount = companyFrequency[company];
        mostFrequentCompany = company;
      }
    }

    return res.status(200).json({
      success: true,
      tickets,
      openTickets,
      closedTickets,
      repeatedCustomer: mostFrequentCompany || null,
    });
  } else {
    return res.status(200).json({
      success: true,
      tickets: [],
      openTickets: 0,
      closedTickets: 0,
      repeatedCustomer: [],
      message: "No tickets found for this user",
    });
  }
};


const createCustomers = async (req, res) => {
  const customerData = req.body;
  const updatedCustomer = Customer.create(customerData);
  if (!updatedCustomer) {
    return res.status(400).json({
      success: false,
      message: "some error in adding customer",
    });
  }
  res.status(200).json({
    success: true,
    message: "successfully added the customer",
  });
};

module.exports = {
  getAllCompanyNamedTickets,
  getAllTickets,
  addNewTickets,
  updateTickets,
  totalTickets,
  viewPending,
  getTicketDetails,
  createCustomers,
};
