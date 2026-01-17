const mongoose = require("mongoose");

const leaveApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: { type: String, required: true },
    applicantName: { type: String, required: true },
    employeeId: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, required: true },

    leaveDays: { type: Number, required: true },
    leaveFrom: { type: String, required: true },
    leaveTo: { type: String, required: true },

    halfDay: { type: String, default: "Not Required" },
    leaveType: { type: String, required: true },

    availableCasual: Number,
    availableSick: Number,
    availableAnnual: Number,
    availableReplacement: Number,

    station: { type: String, required: true },
    contact: { type: String, required: true },

    personInCharge: { type: String, required: true },
    reportingTo: { type: String, required: true },

    reason: { type: String, required: true },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);
