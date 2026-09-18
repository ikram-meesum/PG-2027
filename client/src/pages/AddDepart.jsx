import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ip } from "../components/ipAddress";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

export default function AddDepart() {
  const [depart, setDepart] = useState([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("http://" + ip.address + ":3001/depart")
      .then((response) => {
        //let mysupervisor = response.data;
        //this.setState({supervisorData: mysupervisor});
        console.log("depart:", response.data);
        setDepart(response.data);
      })
      .catch((error) => {
        console.log("line 27: ", error);
      });
  }, []);

  const onSubmit = (data) => {
    axios
      .post("http://" + ip.address + ":3001/depart", {
        ward_name: data.depart,
        campus: data.campus,
      })
      .then((response) => {
        console.log("INSERTED: ", response.data);
        setDepart([
          ...depart,
          {
            _id: response.data._id,
            ward_name: response.data.ward_name,
            campus: response.data.campus,
            ispresent: response.data.ispresent,
            // createdOn: response.data.createdOn,
          },
        ]);
        // setDepart(null);
        // alert("Data Inserted");
      })
      .catch((error) => {
        console.log(error);
      });
    // setDepart(null)
    data.depart = "";
    toast.success("Data inserted successfully.");
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
        All FCPS-II Department
      </h2>
      <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
        FCPS-II Postgraduate Department
      </h2>

      <form
        className="lg:col-span-2 mt-3 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        // onClick={()=> onSubmit}
      >
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 mx-32 md:grid-cols-9">
          <div className="md:col-span-3 mb-3">
            <label className="">DEPARTMENT NAME</label>
            <input
              type="text"
              {...register("depart", { required: true })}
              // name="address"
              // id="address"
              className="border border-gray-200 h-10 mt-1 rounded px-4 w-full bg-gray-50 text-gray-800"
              // value=""
              //   placeholder="Enter Student name"
            />
            {errors.depart && (
              <p className="text-red-900">Department name is required.</p>
            )}
          </div>

          <div className="md:col-span-3 mb-3">
            <label>CAMPUS</label>
            <select
              className="border border-gray-200 h-10  mt-1 rounded px-4 w-full bg-gray-50"
              {...register("campus")}
            >
              <option value="Dr Ruth KM Pfau, Civil Hospital">
                Dr Ruth KM Pfau, Civil Hospital
              </option>
              <option value="Dow University Hospital">
                Dow University Hospital
              </option>
              <option value="DIKIOHS">DIKIOHS</option>
              <option value="Dow Dental College">Dow Dental College</option>
              <option value="Dow International Dental College">
                Dow International Dental College
              </option>
            </select>

            {errors.campus && (
              <p className="text-red-700">Select a department.</p>
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
              INSERT DEPART
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
                  DEPARTMENT ID
                </th>

                <th scope="col" className="pl-3 py-3">
                  DEPARTMENT NAME
                </th>
                <th scope="col" className="pl-3 py-3">
                  INSTITUTE NAME
                </th>

                <th scope="col" className="py-3">
                  CREATED AT
                </th>

                <th scope="col" className="pr-5 py-3">
                  PRESENT
                </th>
              </tr>
            </thead>
            <tbody>
              {depart &&
                depart.map((student, ind) => {
                  return (
                    <tr
                      key={ind}
                      className="bg-white hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                    >
                      <td className="pl-3 text-center py-3">{ind + 1}</td>

                      <td className="pl-3 text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student._id}
                      </td>

                      <td className="pl-3 font-medium text-gray-900">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.ward_name}
                      </td>

                      <td className="pl-3 text-gray-500">
                        {/* {prod.productname.substring(0, 35)}... */}
                        {student.campus}
                      </td>

                      <td className="py-3">
                        {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                      </td>
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
