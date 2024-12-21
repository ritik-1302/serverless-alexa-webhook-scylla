const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    ticketType: {
      type: String,
      required: true,
      enum: ["Housekeeping", "Food", "Other"],
    },

    device: {
      type: mongoose.Schema.ObjectId,
      ref: "device",
      required: true,
    },
    ticketStatus: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },
  },
  { timeStamps: true }
);

const ticket = mongoose.model("ticket", ticketSchema);

module.exports = {
  ticket,
};
