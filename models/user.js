const mongoose = require("mongoose");
const mongoValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate employee IDs
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    isSuperUser: {
      type: Boolean,
      default: false,
    },

    leaveDate: [
      {
        startDate: { type: String, default: "" },
        leaveDate: { type: String, default: "" },
        leave_status: { type: String, default: "pending" },
        leaveDays: { type: Number, default: 0 },
      },
    ],

    image: {
      type: String,
    },

    address: {
      type: String,
    },

    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongoValidator);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
