import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ip } from "../components/ipAddress";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

export default function AddSupervisor() {
  const [depart, setDepart] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [dname, setDName] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);
  //   const navigate = useNavigate();
  let userName = sessionStorage.getItem("user_role");
  console.log("line 17: ", userName);
  // if (userName == "user") {
  //   setIsDisabled(false);
  //   console.log("no");
  // } else {
  //   setIsDisabled(true);
  //   console.log("yes");
  // }

  const getDepart = () => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        //console.log("depart:", response.data);
        setDepart(response.data);
      })
      .catch((error) => {
        console.log("Error from get depart function: ", error);
      });
  };

  const getSupervisorData = () => {
    axios
      .get("http://" + ip.address + ":3001/current_supervisors")
      .then((response) => {
        console.log("supervisor: ", response.data);
        setSupervisor(response.data);
      })
      .catch((error) => {
        console.log("Error from use effect function: ", error);
      });
  };

  useEffect(() => {
    getDepart();
    getSupervisorData();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("all data: ", data);
    if (userName === "user") {
      alert("You are not not allowed for insert record.");
    } else {
      axios
        .post("http://" + ip.address + ":3001/current_supervisors", {
          super_name: data.supervisor,
          depart_id: data.depart,
          email: data.email,
          mobile: data.mobile,
          emp_id: data.empno,
          // ins_name: data.ins_name,
        })
        .then((response) => {
          console.log("INSERTED: ", response.data);

          getSupervisorData();
          toast.success("Supervisor inserted successfully.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // navigate("/loading");
  };
  return (
    <>
      <Navbar />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            // border: "1px solid #713200",
            // padding: "16px",
            color: "black",
            background: "#fab1a0",
          },
        }}
      />

      <h2 className="text-3xl text-center font-bold text-slate-700 mt-9 mb-2">
        All Supervisors Record
      </h2>
      <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
        FCPS-II Postgraduate Supervisors
      </h2>

      <form
        className="lg:col-span-2 mt-3 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        // onClick={()=> onSubmit}
      >
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-32 md:grid-cols-9">
          <div className="md:col-span-3 mb-3">
            <label className="">SUPERVISOR NAME</label>
            <input
              type="text"
              {...register("supervisor", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.supervisor && (
              <p className="text-red-900">Supervisor name is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label className="">EMAIL</label>
            <input
              type="text"
              {...register("email", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.email && <p className="text-red-900">Email is required.</p>}
          </div>

          <div className="md:col-span-3 mb-3">
            <label className="">MOBILE NUMBER</label>
            <input
              type="text"
              {...register("mobile", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.mobile && (
              <p className="text-red-900">Mobile is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label className="">EMPLOYEE NUMBER</label>
            <input
              type="text"
              {...register("empno", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.empno && (
              <p className="text-red-900">Employee number is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>DEPARTMENT</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("depart")}
            >
              {depart.map((itm, ind) => {
                return (
                  <option key={ind} value={itm._id}>
                    {itm.ward_name}
                  </option>
                );
              })}
            </select>

            {errors.depart && (
              <p className="text-red-700">Department is required.</p>
            )}
          </div>

          <div className="md:col-span-3">
            <button
              className={
                // !pImage
                //   ? "bg-gray-200 text-slate-400 font-bold py-2 px-6 rounded"
                `bg-slate-800 mt-6 hover:bg-slate-700 text-white font-medium py-2 px-2 text-sm rounded`
              }
            >
              ADD SUPERVISOR
            </button>
          </div>
        </div>
      </form>

      {/* TABLE */}

      <section className="mb-10">
        <div className="rounded-lg mx-5 mt-5 overflow-hidden shadow-lg">
          <table
            id="my-table"
            className="w-full text-sm text-left rtl:text-right text-gray-500"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-slate-900 rounded-lg text-white">
                <th scope="col" className="pl-5 w-10 py-3">
                  S #
                </th>

                <th scope="col" className="pl-3 py-3">
                  DEPARTMENT
                </th>

                <th scope="col" className="pl-3 py-3">
                  SUPERVISOR NAME
                </th>

                <th scope="col" className="pl-3 py-3">
                  INSTITUTE NAME
                </th>

                <th scope="col" className="pl-3 py-3">
                  EMP ID
                </th>

                <th scope="col" className="pl-3 py-3">
                  EMAIL
                </th>

                <th scope="col" className="pl-3 py-3">
                  MOBILE
                </th>

                <th scope="col" className="pr-1 py-3">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {supervisor &&
                supervisor.map((student, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                    >
                      <td className="pl-3 text-center py-3">{ind + 1}</td>

                      <td className="pl-3 text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.depart_id["ward_name"]}
                      </td>

                      <td className="pl-3 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.super_name}
                      </td>

                      <td className="pl-3 text-gray-500">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.depart_id["campus"]}
                      </td>

                      <td className="pl-3 text-gray-500">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.emp_id}
                      </td>

                      <td className="pl-3 text-gray-500">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.email}
                      </td>

                      <td className="pl-3 text-gray-500">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.mobile}
                      </td>

                      {/* <td className="py-3">
                        {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                      </td> */}
                      <td className="mr-3 py-3">{student.ispresent}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
