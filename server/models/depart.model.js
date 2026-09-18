let mongoose = require("mongoose");

let departSchema = mongoose.Schema(
  {
    ward_name: { type: String, uppercase: true },
    campus: { type: String },
    ispresent: { type: String, default: "YES" },
  },
  { timestamps: true }
);

let Fcps_Depart = mongoose.model("Fcpsward", departSchema);
module.exports = Fcps_Depart;
