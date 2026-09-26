let mongoose = require("mongoose");

/*
let departScheme = mongoose.Schema({
    monthof: String,
    amount: Number,
    createdOn: {type: Date, default: Date.now()},
    paydate: Date,
    status: String
});

let feeScheme = mongoose.Schema({
    monthof: String,
    amount: Number,
    createdOn: {type: Date, default: Date.now()},
    paydate: Date,
    status: String
});
*/

let fcpsSchema = mongoose.Schema(
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
    category: { type: String, default: "FCPS" },
    upload: { type: String, default: "NO" },
    // qrcode: [attendanceScheme],
    // fees: [feeScheme],
  },
  { timestamps: true },
);

let FCPS = mongoose.model("Fcps", fcpsSchema);
module.exports = FCPS;
