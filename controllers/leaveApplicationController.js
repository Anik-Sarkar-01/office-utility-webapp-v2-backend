const LeaveApplication = require("../models/LeaveApplication");

exports.createLeaveApplication = async (req, res) => {
  try {
    const leave = new LeaveApplication({
      ...req.body,
      userId: req.user.id,
    });

    console.log(leave)

    await leave.save();

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      leaveId: leave._id,
    });
  } catch (error) {
    console.error("Leave save error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit leave application",
    });
  }
};
