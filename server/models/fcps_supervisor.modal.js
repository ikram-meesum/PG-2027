let mongoose = require("mongoose");

let fcps_supervisorSchema = mongoose.Schema(
  {
    super_name: { type: String, uppercase: true },
    ispresent: { type: String },
    email: { type: String, uppercase: false },
    mobile: { type: String },
    depart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fcpsward" },
    emp_id: { type: String },
    // ins_name: { type: String },
  },
  { timestamps: true },
);

let Fcps_Supevisor = mongoose.model("Fcpssupervisor", fcps_supervisorSchema);
module.exports = Fcps_Supevisor;
