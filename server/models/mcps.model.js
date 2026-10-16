let mongoose = require("mongoose");

let mcpsSchema = mongoose.Schema(
  {
    sname: { type: String, uppercase: true },
    fname: { type: String, uppercase: true },
    email: { type: String, uppercase: false },
    mobile: String,
    doj: Date,
    dor: Date,
    domicile: { type: String, uppercase: true },
    account_no: String,
    cnic: String,
    do_birth: Date,
    cmsid: String,
    nationality: { type: String, uppercase: true },
    pmdc_no: { type: String, uppercase: true },
    rtmc_no: { type: String, uppercase: true },
    gender: String,
    depart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Fcpsward" },
    supervisor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fcpssupervisor",
    },
    address: { type: String, uppercase: true },
    govt: String,
    ispresent: String,
    emp_id: String,
    remarks: { type: String, uppercase: true },
    religion: String,
    category: { type: String, default: "MCPS" },
    upload: { type: String, default: "NO" },
    // qrcode: [attendanceScheme],
    // fees: [feeScheme],
  },
  { timestamps: true },
);

let MCPS = mongoose.model("mcps", mcpsSchema);
module.exports = MCPS;
