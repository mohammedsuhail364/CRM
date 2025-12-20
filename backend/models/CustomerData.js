const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  id: String,
  company: String,
  contactPerson: String,
  emailId: String,
  mobileNumber1: String,
  mobileNumber2: String,
  address: String,
  site: String,
  city: String,
  state: String,
  gstNumber: String,
  referredBy: String,
  customerType: String,
  closingBalance: String,
  serialNo: String,
  tssRenewalDate: String,
  amcExpiredDate: String,
  productType: String,
  aws: Boolean,
  whatsapp: Boolean,
  amc: Boolean,
  tdlLoaded: Boolean,
});

module.exports=mongoose.model('CustomerData',customerSchema);
