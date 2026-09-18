import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ip } from "../components/ipAddress";
import { useNavigate } from "react-router";

export default function AddStudent() {
  const [allTrainee, setAllTrainee] = useState([]);
  const [allDepart, setAllDepart] = useState([]);
  const [allSupervisor, setAllSupervisor] = useState([]);
  const [departId, setDepartId] = useState("");

  let navigate = useNavigate();

  let userName = sessionStorage.getItem("user_role");
  console.log(userName);
  if (userName == "user") {
    navigate("/home");
  }

  // GET DEPARTMENT
  const getDepart = () => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        console.log("depart:", response.data);
        setAllDepart(response.data);
      })
      .catch((error) => {
        console.log("Error from get depart function: ", error);
      });
  };

  // GET SUPERVISOR
  const getSupervisorData = (id) => {
    let pathUri = "http://" + ip.address + ":3001/depart_supervisor/" + id;
    console.log("path :", pathUri);

    axios
      .get(pathUri)
      .then((response) => {
        console.log("supervisor: ", response.data);
        setAllSupervisor(response.data);
      })
      .catch((error) => {
        console.log("Error from use effect function: ", error);
      });
  };

  useEffect(() => {
    getDepart();
    // getSupervisorData();
  }, []);

  // FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // INSERT DATA
  const onSubmit = (data) => {
    console.log(data);

    if (data.depart == "Select Depart") {
      alert("Please a valid department");
    } else {
      axios
        .post("http://" + ip.address + ":3001/addfcps", {
          txtsname: data.sname,
          txtfname: data.fname,
          txtemail: data.email,
          txtmobile: data.mobile,
          txtdoj: data.doj,
          txtdor: data.dor,
          txtdomicile: data.domicile,
          txtaccount_no: data.account,
          txtcnic: data.cnic,
          txtdob: data.dob,
          txtcmsid: data.cmsid,
          txtempid: data.empid,
          txtnationality: data.nationalty,
          txtpmdc: data.pmdcno,
          txtrtmc: data.rtmcno,
          cmbgender: data.gender,
          cmbdepart: data.fruits, //---------------------------
          cmbsupervisor: data.supervisor,
          txtaddress: data.address,
          cmbgovt: data.govt,
          cmbpresent: data.present,
          txtremarks: data.remarks,
          cmbreligion: data.religion,
        })
        .then((response) => {
          console.log("r: ", response.data);

          // setSupervisor([
          //   ...supervisor,
          //   {
          //     super_name: response.data.super_name,
          //     depart_id: response.data.depart_id,
          //     email: response.data.email,
          //     mobile: response.data.mobile,
          //   },
          // ]);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/current-fcps");
    }
  };

  const fruits = register("fruits");
  console.log("FRITS: ", fruits);

  return (
    <section className="">
      <Navbar />

      <h2 className="text-3xl text-center font-bold text-slate-700 mt-9 mb-2">
        Add New FCPS-II Trainee
      </h2>
      <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
        FCPS-II Postgraduate Trainees
      </h2>
      {/* start alert */}
      <div
        className="flex items-center p-4 mt-6 mb-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 w-4/5 mx-auto"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Important Message!</span> Please fill
          the student form carefully for registration.
        </div>
      </div>
      {/* end alert */}

      <div className="grid grid-cols-1 gap-4 w-4/5 mx-auto">
        <h1 className="text-xl font-semibold mb-3">INFORMATION DETAILS</h1>
      </div>

      <form
        className="lg:col-span-2 mt-3 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        // onClick={()=> onSubmit}
      >
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-32 md:grid-cols-9">
          <div className="md:col-span-3 mb-3">
            <label className="">STUDENT NAME</label>
            <input
              type="text"
              {...register("sname", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.sname && (
              <p className="text-red-900">Full name is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>VALID EMAIL</label>
            <input
              type="email"
              {...register("email", { required: true })}
              // name="city"
              // id="city"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              // value=""
              //   placeholder="Valid email"
            />
            {errors.email && (
              <p className="text-red-700">Valid email is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>FATHER NAME</label>
            <input
              type="text"
              {...register("fname", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Father Name"
            />
            {errors.fname && <p className="text-red-700">Father Name.</p>}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>MOBILE NO.</label>
            <input
              type="text"
              {...register("mobile", { required: true, minLength: 12 })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Password"
            />
            {errors.mobile && (
              <p className="text-red-700">Mobile is atleast 6 characters.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>DATE OF JOINING</label>
            <input
              type="date"
              {...register("doj", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Password"
            />
            {errors.doj && (
              <p className="text-red-700">Date of joining is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>DATE OF RELIEVING</label>
            <input
              type="date"
              {...register("dor", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Password"
            />
            {errors.dor && (
              <p className="text-red-700">Date of relieving is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>DOMICILE</label>
            <input
              type="text"
              {...register("domicile", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Mobile No"
            />
            {errors.domicile && (
              <p className="text-red-700">Domicile is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>CNIC NO.</label>
            <input
              type="text"
              {...register("cnic", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter CNIC No"
            />
            {errors.cnic && <p className="text-red-700">CNIC is Requidred.</p>}
          </div>

          <div className="md:col-span-3">
            <label>ACCOUNT NO</label>
            <input
              type="text"
              {...register("account", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Batch No"
            />
            {errors.account && (
              <p className="text-red-700">Account no is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>CMS ID</label>
            <input
              type="text"
              {...register("cmsid", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Roll No"
            />
            {errors.cmsid && (
              <p className="text-red-700">CMS id is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>DATE OF BIRTH</label>
            <input
              type="date"
              {...register("dob", { required: true })}
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Password"
            />
            {errors.dob && (
              <p className="text-red-700">Date of birth is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>NATIONALTY</label>
            <input
              type="text"
              {...register("nationalty", { required: true })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.nationalty && (
              <p className="text-red-700">Nationalty is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>PMDC NO</label>
            <input
              type="text"
              {...register("pmdcno", { required: true })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.pmdcno && (
              <p className="text-red-700">PMDC # is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>RTMC NO</label>
            <input
              type="text"
              {...register("rtmcno", { required: true })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.rtmcno && (
              <p className="text-red-700">RTMC # is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>GENDER</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("gender")}
            >
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>

            {errors.gender && <p className="text-red-700">Select a gender.</p>}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>DEPARTMENT</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("fruits")}
              onChange={(e) => {
                fruits.onChange(e); // Call react-hook-form's onChange
                console.log("BEFORE depart id is: ", e.target.value); // Your custom logic
                setDepartId(e.target.value);
                console.log("AFTER depart id is: ", departId); // Your custom logic
                getSupervisorData(e.target.value);
              }}
              onBlur={fruits.onBlur}
              ref={fruits.ref}
            >
              <option value={"SELECT DEPART"}>PLEASE SELECT</option>
              {allDepart.map((itm, ind) => {
                return (
                  <option key={ind} value={itm._id}>
                    {itm.ward_name}
                  </option>
                );
              })}
            </select>

            {errors.fruits && (
              <p className="text-red-700">Select a department.</p>
            )}
          </div>

          {/* <div className="md:col-span-3">
            <label>test 123</label>
            <select
              onChange={(e) => {
                fruits.onChange(e); // Call react-hook-form's onChange
                console.log("My custom onChange logic:", e.target.value); // Your custom logic
              }}
              onBlur={fruits.onBlur}
              ref={fruits.ref}
            >
              <option value="">Select a fruit</option>
              <option value="banana">Banana</option>
              <option value="kiwi">Kiwi</option>
            </select>

            {errors.supervisor && (
              <p className="text-red-700">Select a supervisor.</p>
            )}
          </div> */}

          <div className="md:col-span-3">
            <label>SUPERVISOR</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("supervisor")}
            >
              <option value={"SELECT supervisor"}>SELECT SUPERVISOR</option>
              {allSupervisor.map((itm, ind) => {
                return (
                  <option key={ind} value={itm._id}>
                    {itm.super_name}
                  </option>
                );
              })}

              {/* <option value="FEMALE">FEMALE</option> */}
            </select>

            {errors.supervisor && (
              <p className="text-red-700">Select a supervisor.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>GOVT</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("govt")}
            >
              <option value="EOL">EOL</option>
              <option value="GOVT">GOVT</option>
              <option value="PRIVATE">PRIVATE</option>
              <option value="DUHS">DUHS</option>
            </select>

            {errors.govt && <p className="text-red-700">Please select any.</p>}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>PRESENT</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("present")}
            >
              <option value="WORKING">WORKING</option>
              <option value="COMPLETE">COMPLETE</option>
              <option value="LEFT">LEFT</option>
              <option value="RESIGN">RESIGN</option>
            </select>

            {errors.present && <p className="text-red-700">Select any.</p>}
          </div>

          <div className="md:col-span-3">
            <label>ADDRESS</label>
            <input
              type="text"
              {...register("address", { required: true, minLength: 6 })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-700">Enter the permenant address.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>RELIGION</label>
            <select
              {...register("religion")}
              className="border border-gray-200 bg-gray-50  h-10 mt-1 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"MUSLIM"}>MUSLIM</option>
              <option value={"NON MUSLIM"}>NON MUSLIM</option>
            </select>
            {errors.religion && (
              <p className="text-red-700">Select a religion.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>EMPLOYEE ID</label>
            <input
              type="text"
              {...register("empid", { required: true })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.empid && (
              <p className="text-red-700">Enter the emloyee id.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <label>REMARKS</label>
            <input
              type="text"
              {...register("remarks", { required: true })}
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              //   placeholder="Enter Address"
            />
            {errors.remarks && (
              <p className="text-red-700">Enter the any remarks.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <button
              // disabled={!pImage}
              className={
                // !pImage
                //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                `bg-slate-800 mt-6 hover:bg-slate-700 text-white font-medium py-2 px-2 text-sm rounded`
              }
            >
              ADD STUDENT
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
