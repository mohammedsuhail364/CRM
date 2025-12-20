const User = require("../models/User");
const Company=require('../models/CustomerData');
const getAllData = async (req, res) => {
  try {
    const employees = await User.find().lean();

    let totalEmployees = 0;
    let totalTickets = 0;
    let openTickets = 0;
    let closedTickets = 0;
    let employeeDetails = [];

    const globalRepeatedCount = {}; // Global repeated customer tracker

    const todayDate = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    employees.forEach((employee) => {
      if (employee.role === "user") {
        totalEmployees++;
      }
      const empRepeatMap = {}; // Per-employee repeated map

      let empOpen = 0;
      let empClosed = 0;
      let empTickets = 0;

      Object.keys(employee.tickets || {}).forEach((company) => {
        employee.tickets[company].forEach((ticket) => {
          const ticketDate = ticket.date?.slice(0, 10);
          if (ticketDate !== todayDate) return; // Skip if not today's ticket
          empTickets++;
          totalTickets++;

          // Track employee-level repetition
          empRepeatMap[company] = (empRepeatMap[company] || 0) + 1;

          // Track global repetition
          globalRepeatedCount[company] =
            (globalRepeatedCount[company] || 0) + 1;

          // Open / Closed ticket logic
          if (!ticket.solution) {
            empOpen++;
            openTickets++;
          } else {
            empClosed++;
            closedTickets++;
          }
        });
      });
      // Find most repeated customer for this employee
      let empMostRepeated = "";
      let empMax = 0;
      for (const [cust, count] of Object.entries(empRepeatMap)) {
        if (count > empMax) {
          empMostRepeated = cust;
          empMax = count;
        }
      }

      employeeDetails.push({
        userName: employee.userName,
        openTickets: empOpen,
        closedTickets: empClosed,
        mostRepeatedCustomer: empMostRepeated,
      });
    });

    // Global most repeated customer
    let mostRepeatedCustomer = "";
    let maxGlobal = 0;
    for (const [cust, count] of Object.entries(globalRepeatedCount)) {
      if (count > maxGlobal) {
        mostRepeatedCustomer = cust;
        maxGlobal = count;
      }
    }

    res.json({
      totalEmployees,
      totalTickets,
      openTickets,
      closedTickets,
      mostRepeatedCustomer,
      employeeDetails,
    });
  } catch (err) {
    console.error("Error fetching all data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "user" });

    // Get today's date in 'YYYY-MM-DD' format
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const result = employees.map((employee) => {
      const tickets = employee.tickets || {};
      let openTickets = 0;
      let closedTickets = 0;
      let repeatedCustomer = null;
      let maxTickets = 0;

      for (const company in tickets) {
        const companyTickets = tickets[company] || [];

        // Only consider today's tickets based on ticket.date
        const todaysTickets = companyTickets.filter(
          (ticket) => ticket.date === todayStr
        );

        // Count open and closed tickets from today's tickets
        todaysTickets.forEach((ticket) => {
          if (ticket.solution && ticket.solution.trim() !== "") {
            closedTickets++;
          } else {
            openTickets++;
          }
        });

        // Determine most frequent company from today's tickets
        if (todaysTickets.length > maxTickets) {
          maxTickets = todaysTickets.length;
          repeatedCustomer = company;
        }
      }

      return {
        id: employee._id,
        userName: employee.userName,
        openTickets,
        closedTickets,
        repeatedCustomer,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getEmployeeCustomerDetails = async (req, res) => {
  const { id } = req.params; // Employee ID from URL params
  const { type } = req.query; // 'open', 'closed', or 'pending'

  try {
    const employee = await User.findById(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    const tickets = [];

    for (const company in employee.tickets) {
      const companyTickets = employee.tickets[company];

      companyTickets.forEach((ticket) => {
        const isSolved = ticket.solution && ticket.solution.trim() !== "";

        if (type === "open") {
          // Include all tickets
          tickets.push({ ...ticket, company });
        } else if (type === "closed" && isSolved) {
          tickets.push({ ...ticket, company });
        } else if (type === "pending" && !isSolved) {
          tickets.push({ ...ticket, company });
        }
      });
    }

    res.json({
      userName: employee.userName,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee ticket details." });
  }
};

const getTotalTickets = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const totalTickets = [];

    for (const user of users) {
      const companyTickets = user.tickets;

      if (companyTickets) {
        for (const [companyName, ticketArray] of Object.entries(companyTickets)) {
          const companyDetails = await Company.findOne({ company: companyName });

          const enrichedTickets = ticketArray.map((ticket) => ({
            ...ticket,
            user: user.userName,
            company: companyDetails?.company || companyName,
            companyDetails,
          }));

          totalTickets.push(...enrichedTickets);
        }
      }
    }

    res.json({ totalCount: totalTickets.length, tickets: totalTickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getClosedTickets = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const closedTickets = [];

    for (const user of users) {
      const companyTickets = user.tickets;

      if (companyTickets) {
        for (const [companyName, ticketArray] of Object.entries(companyTickets)) {
          const companyDetails = await Company.findOne({ company: companyName });

          const filtered = ticketArray
            .filter((ticket) => ticket.solution && ticket.solution.trim() !== "")
            .map((ticket) => ({
              ...ticket,
              user: user.userName,
              company: companyDetails?.company || companyName,
              companyDetails,
            }));

          closedTickets.push(...filtered);
        }
      }
    }

    res.json({ closedCount: closedTickets.length, tickets: closedTickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getOpenTickets = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const openTickets = [];

    for (const user of users) {
      const companyTickets = user.tickets;

      if (companyTickets) {
        for (const [companyName, ticketArray] of Object.entries(companyTickets)) {
          const companyDetails = await Company.findOne({ company: companyName });

          const filtered = ticketArray
            .filter((ticket) => !ticket.solution || ticket.solution.trim() === "")
            .map((ticket) => ({
              ...ticket,
              user: user.userName,
              company: companyDetails?.company || companyName,
              companyDetails,
            }));

          openTickets.push(...filtered);
        }
      }
    }

    res.json({ openCount: openTickets.length, tickets: openTickets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const insertEmployeeData = async (req, res) => {
  const employee = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ userEmail: employee.userEmail });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create new employee
    const newEmployee = await User.create(employee);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getEmployees,
  getEmployeeCustomerDetails,
  getAllData,
  getOpenTickets,
  getTotalTickets,
  getClosedTickets,
  insertEmployeeData,
};
