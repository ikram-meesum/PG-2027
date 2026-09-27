import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

export default function YearlyReport() {
  const [allStudent, setAllStudent] = useState([]);
  const [year, setYear] = useState(null);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function getData() {}

  const onSubmit = async (data) => {
    console.log(data.year);
    let year = data.year;
    try {
      const res = await axios(`http://localhost:3001/yearwise_report/${year}`);
      const data = await res.data;
      console.log("GET DATA: ", data);
      if (data.length <= 0) {
        alert("No data found. Please enter valid year.");
      }
      setAllStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  };

  // const getReport = () => {
  //   console.log("test123");
  // };

  return (
    <>
      <Navbar />
      <form
        className="mt-3 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        // onClick={()=> onSubmit}
      >
        <div className="mt-3 mr-3 flex justify-end">
          {/* <label className="mt-2 mr-2 font-semibold">Enter Year:</label> */}
          <div>
            <input
              type="number"
              {...register("year", { required: true })}
              placeholder="Enter valid year"
              className="border border-gray-200 placeholder:text-gray-400 h-10 rounded px-4 bg-gray-50 text-gray-800"
            />
          </div>

          <button
            // type="button"
            // onClick={getReport}
            className="bg-slate-800 hover:bg-slate-700 text-white ml-2 font-medium py-2 px-5 text-sm rounded"
          >
            Report
          </button>
        </div>
        {errors.year && (
          <p className="text-red-700 text-right mr-40">
            Valid year is required.
          </p>
        )}
      </form>
      {/* <div>YearlyReport</div> */}
      {allStudent.length <= 0 ? (
        <h2 className="">.</h2>
      ) : (
        <>
          <h2 className="text-3xl text-center font-bold text-slate-700 mt-9 mb-2">
            FCPS Record Year Wise
          </h2>
          <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
            FCPS-II Postgraduate Trainees
          </h2>

          <section>
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

                    <th scope="col" className="pl-4 py-3">
                      STUDENT NAME
                    </th>
                    <th scope="col" className="pl-4 py-3">
                      FATHER NAME
                    </th>

                    <th scope="col" className="py-3">
                      DEPARTMENT
                    </th>

                    <th scope="col" className="pr-5 py-3">
                      SUPERVISOR NAME
                    </th>

                    <th scope="col" className="pr-5 py-3">
                      D.O.J
                    </th>

                    <th scope="col" className="pr-5 w-24 py-3">
                      D.O.R
                    </th>

                    <th scope="col" className="py-3 pr-2">
                      CONTACT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allStudent &&
                    allStudent.map((student, ind) => {
                      return (
                        <tr
                          key={ind}
                          className="bg-white hover:bg-gray-100 odd:bg-white even:bg-gray-50"
                        >
                          <td className="pl-3 text-center py-3">{ind + 1}</td>

                          <td className="pl-3 font-medium text-gray-900">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {student.sname}
                          </td>

                          <td className="pl-3 text-gray-900">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {student.fname}
                          </td>
                          <td className="mr-3 py-3">
                            {student.depart_id["ward_name"]}
                          </td>
                          <td className="mr-3 py-3">
                            {student.supervisor_id["super_name"]}
                          </td>

                          <td className="pl-1 text-gray-500">
                            {/* {prod.productname.substring(0, 35)}... */}
                            {dayjs(student.doj).format("DD-MMM-YYYY")}
                          </td>

                          <td className="mr-3 py-3">
                            {dayjs(student.dor).format("DD-MMM-YYYY")}
                          </td>

                          {/* <td className="py-3">
                                {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                              </td> */}
                          <td className="mr-3 py-3">
                            <p className="flex items-center gap-2">
                              {student.mobile}
                              {/* <Link to={`/detail/${student._id}`}>
                            <BiSolidCommentDetail
                              size={"20px"}
                              color="#fd79a8"
                            />
                          </Link>
                          <Link to={`/upload/${student._id}`}>
                            <GrDocumentPdf size={"20px"} color="#74b9ff" />
                          </Link> */}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
}
