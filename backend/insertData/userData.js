const CustomerData = require("../models/CustomerData");
const User = require("../models/User");
const employee = {
  userName: "dawood",
  userEmail: "sdawood1977@gmail.com",
  password: "123456",
  role: "user",
  totalTickets:0,
  tickets: {},
};
const users = [
  {
    id: "USR001",
    company: "ABC Pvt Ltd",
    contactPerson: "John Doe",
    emailId: "john.doe@example.com",
    mobileNumber1: "9876543210",
    mobileNumber2: "9123456780",
    address: "123, Street Name, City",
    site: "Main Office",
    city: "Chennai",
    state: "Tamil Nadu",
    gstNumber: "33ABCDE1234F1Z5",
    referredBy: "Michael Scott",
    customerType: "Corporate",
    closingBalance: "5000",
    serialNo: "SN123456789",
    tssRenewalDate: "2025-03-10",
    amcExpiredDate: "2025-06-15",
    productType: "Software",
    aws: true,
    whatsapp: false,
    amc: true,
    tdlLoaded: false,
  },
  {
    id: "USR002",
    company: "XYZ Solutions",
    contactPerson: "Alice Smith",
    emailId: "alice.smith@example.com",
    mobileNumber1: "9988776655",
    mobileNumber2: "9876543211",
    address: "456, Avenue Street, City",
    site: "Branch Office",
    city: "Bangalore",
    state: "Karnataka",
    gstNumber: "29XYZ1234G1Z9",
    referredBy: "Jim Halpert",
    customerType: "Retail",
    closingBalance: "7000",
    serialNo: "SN987654321",
    tssRenewalDate: "2025-04-20",
    amcExpiredDate: "2025-07-10",
    productType: "Hardware",
    aws: false,
    whatsapp: true,
    amc: false,
    tdlLoaded: true,
  },
  {
    id: "USR003",
    company: "Tech Innovations",
    contactPerson: "Robert Johnson",
    emailId: "robert.johnson@example.com",
    mobileNumber1: "9786543210",
    mobileNumber2: "9765432109",
    address: "789, Tech Park, City",
    site: "Headquarters",
    city: "Hyderabad",
    state: "Telangana",
    gstNumber: "36ROBERT1234H1Z8",
    referredBy: "Pam Beesly",
    customerType: "Enterprise",
    closingBalance: "12000",
    serialNo: "SN456789123",
    tssRenewalDate: "2025-05-15",
    amcExpiredDate: "2025-09-01",
    productType: "Cloud Service",
    aws: true,
    whatsapp: true,
    amc: true,
    tdlLoaded: false,
  },
  {
    id: "USR004",
    company: "Innovate Corp",
    contactPerson: "Emily Davis",
    emailId: "emily.davis@example.com",
    mobileNumber1: "9867543210",
    mobileNumber2: "9654321098",
    address: "555, Business Hub, City",
    site: "Regional Office",
    city: "Mumbai",
    state: "Maharashtra",
    gstNumber: "27EMILY1234D1Z6",
    referredBy: "Stanley Hudson",
    customerType: "SME",
    closingBalance: "9000",
    serialNo: "SN321654987",
    tssRenewalDate: "2025-06-30",
    amcExpiredDate: "2025-08-20",
    productType: "Security Software",
    aws: false,
    whatsapp: false,
    amc: true,
    tdlLoaded: true,
  },
  {
    id: "USR005",
    company: "NextGen Solutions",
    contactPerson: "David Wilson",
    emailId: "david.wilson@example.com",
    mobileNumber1: "9765432101",
    mobileNumber2: "9543210987",
    address: "222, Tech Valley, City",
    site: "Remote Office",
    city: "Delhi",
    state: "Delhi",
    gstNumber: "07DAVID1234W1Z7",
    referredBy: "Kevin Malone",
    customerType: "Startup",
    closingBalance: "11000",
    serialNo: "SN789123456",
    tssRenewalDate: "2025-07-10",
    amcExpiredDate: "2025-10-05",
    productType: "AI Platform",
    aws: true,
    whatsapp: false,
    amc: false,
    tdlLoaded: false,
  },
];
const insertCustomerData = async () => {
  try {
    await Promise.all(users.map((item) => CustomerData.create(item)));
    console.log("All users inserted successfully.");
  } catch (error) {
    console.error("Error inserting customer data:", error);
  }
};

const insertEmployeeData = async () => {
  try {
    const newEmployee = await User.create(employee);

    console.log("Employee successfully saved", newEmployee);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insertCustomerData,
  insertEmployeeData,
};
