// controllers/leaveApplicationController.js
const LeaveApplication = require("../models/LeaveApplication");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createLeaveApplication = async (req, res) => {
  try {
    // Get token from header (like in loginUser)
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided."
      });
    }

    const token = authHeader.replace("Bearer ", "");
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Now create leave with authenticated user
    const leave = new LeaveApplication({
      ...req.body,
      userId: user._id, // Use authenticated user ID
      status: "pending",
      appliedDate: new Date()
    });

    console.log("Creating leave for user:", user.email);

    await leave.save();

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      leaveId: leave._id,
      data: leave
    });
  } catch (error) {
    console.error("Leave save error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Failed to submit leave application",
      error: error.message
    });
  }
};