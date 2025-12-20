const User = require("../models/User");


const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  
  const { email, password } = req.body;
  
   
  const checkUser = await User.findOne({userEmail:email  });
  
  
  if (!checkUser || password !== checkUser.password) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  const accessToken = jwt.sign(
    {
      _id: checkUser._id,
      userName: checkUser.userName,
      userEmail: checkUser.userEmail,
      role: checkUser.role,
    },
    "JWT_SECRET",
    { expiresIn: "120m" }
  );
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      accessToken,
      user: {
        _id: checkUser._id,
        userName: checkUser.userName,
        userEmail: checkUser.userEmail,
        role: checkUser.role,
      },
    },
  });
};

module.exports = {
  loginUser,
};
