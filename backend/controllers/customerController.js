const CustomerData = require("../models/CustomerData");

const collectCustomerData = async (req, res) => {
  const allCustomers = await CustomerData.find({});
  if (!allCustomers) {
    return res.status(400).json({
      success: false,
      message: "no user found",
    });
  }
  res.status(200).json({
    success: true,
    data: allCustomers,
  });
};

module.exports = {
  collectCustomerData,
};
