import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import dayjs from "dayjs";
import { Link } from "react-router";
import { TiArrowBackOutline } from "react-icons/ti";

export default function FCPSDetail() {
  const [allStudent, setAllStudent] = useState([]);
  let navigate = useNavigate();

  let userName = sessionStorage.getItem("user_role");
  console.log(userName);
  if (userName == null) {
    navigate("/");
  }

  let { id } = useParams();
  console.log("id is: ", id);

  let path = `http://localhost:3001/fcpspresent/${id}`;
  console.log("path", path);

  async function getData() {
    try {
      const res = await axios(`http://localhost:3001/fcpspresent/${id}`);
      const data = await res.data;
      console.log("SINGLE DATA: ", data);
      setAllStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  useEffect(() => {
    getData();
    // console.log("SNAME: ", allStudent[0]["sname"]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-3xl font-semibold text-slate-800 text-center mt-10">
        FCPS-II Trainee Detail
      </div>
      <div className="font-semibold text-slate-500 text-center mt-1 mb-1">
        FCPS-II Trainee Detail
      </div>

      <div className="flex justify-end mr-16 mb-5">
        <Link
          to={"/current-fcps"}
          className="text-white flex bg-slate-900 hover:bg-slate-800 font-semibold transition duration-100 px-6 py-1 rounded-md"
        >
          <TiArrowBackOutline className="mt-1 mr-1" />
          <span>Back</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl mx-auto max-w-6xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJkkm7uW2ah8KavMmvbsn2eBdjm-WfdRAarzNcSDCBQ&s=10"
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-slate-700 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
            />
            {allStudent &&
              allStudent.map((student, index) => {
                return (
                  <>
                    <h1
                      key={index + 1}
                      className="text-xl font-bold text-slate-700 mb-2"
                    >
                      {student.sname}
                    </h1>
                    <p className="text-slate-500">{student.fname}</p>

                    <button className="mt-4 bg-blue-700 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-900 transition-colors duration-300">
                      {student["depart_id"]["ward_name"]}
                    </button>
                  </>
                );
              })}
          </div>
          {/*  */}
          <div className="md:w-2/3 md:pl-8">
            {allStudent &&
              allStudent.map((student, ind) => {
                return (
                  <h2
                    key={ind + 2}
                    className="text-xl font-semibold text-indigo-800 mb-4"
                  >
                    SUPERVISOR: {student["supervisor_id"]["super_name"]}
                  </h2>
                );
              })}
            {/* start */}
            <table className="w-full text-slate-800 mb-20">
              {allStudent &&
                allStudent.map((student, ind) => {
                  return (
                    <>
                      <tr
                        key={ind + 3}
                        className="border border-gray-100 bg-gray-50 mt-10"
                      >
                        <td className="py-1 pl-3">Date of Joining:</td>
                        <td className="text-slate-500">
                          {dayjs(student.doj).format("DD-MMM-YYYY")}
                        </td>
                        <td>Date of Releiving:</td>
                        <td className="text-slate-500">
                          {dayjs(student.dor).format("DD-MMM-YYYY")}
                        </td>
                      </tr>

                      <tr className="border border-gray-100">
                        <td className="py-1 pl-3">Account No: </td>
                        <td className="text-slate-500">{student.account_no}</td>
                        <td>CMS ID: </td>
                        <td className="text-slate-500">{student.cmsid}</td>
                      </tr>

                      <tr className="border border-gray-100 bg-gray-50">
                        <td className="py-1 pl-3">CNIC No: </td>
                        <td className="text-slate-500">{student.cnic}</td>
                        <td>Date of Birth: </td>
                        <td className="text-slate-500">
                          {dayjs(student.do_birth).format("DD-MMM-YYYY")}
                        </td>
                      </tr>

                      <tr className="border border-gray-100">
                        <td className="py-1 pl-3">Domicile: </td>
                        <td className="text-slate-500">{student.domicile}</td>
                        <td>Gender: </td>
                        <td className="text-slate-500">{student.gender}</td>
                      </tr>

                      <tr className="border border-gray-100 bg-gray-50">
                        <td className="py-1 pl-3">Govt: </td>
                        <td className="text-slate-500">{student.govt}</td>
                        <td>Nationalty: </td>
                        <td className="text-slate-500">
                          {student.nationality}
                        </td>
                      </tr>
                    </>
                  );
                })}
            </table>
            {/* ----------- */}
            {/* <table className="w-full text-slate-800 mb-20">
              <tr className="border border-gray-100 mt-10">
                <td className="">Date of Joining:</td>
                <td className="text-slate-500">
                  {dayjs(allStudent[0]["doj"]).format("DD-MMM-YYYY")}
                </td>
                <td>Date of Releiving:</td>
                <td className="text-slate-500">
                  {dayjs(allStudent[0]["dor"]).format("DD-MMM-YYYY")}
                </td>
              </tr>

              <tr className="border border-gray-100">
                <td className="font-semibold">Account # </td>
                <td>{allStudent[0]["account_no"]}</td>
                <td>CMS ID: </td>
                <td>{allStudent[0]["cmsid"]}</td>
              </tr>
            </table> */}

            {/* end */}
            <p className="text-slate-700 mb-6">
              {/* {allStudent[0]["account_no"]} CMS ID: {allStudent[0]["cmsid"]}.
              CNIC: {allStudent[0]["cnic"]}. Created At:{" "}
              {allStudent[0]["createdAt"]}. Date of Birth{" "}
              {allStudent[0]["do_birth"]}. Sindh Domicile:{" "}
              {allStudent[0]["domicile"]} software developer with 5 years of
              experience in web technologies. I love creating user-friendly
              applications and solving complex problems. */}
            </p>
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
              Other Information
            </h2>
            {allStudent &&
              allStudent.map((student, ind) => {
                return (
                  <div key={4} className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      PMDC: {student.pmdc_no}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      RTMC: {student.rtmc_no}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      CNIC: {student.cnic}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      NATIONALTY: {student.nationality}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                      CREATED: {dayjs(student.createdAt).format("DD-MMM-YYYY")}
                    </span>
                  </div>
                );
              })}
            {/*  */}
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
              Contact Information
            </h2>
            {allStudent &&
              allStudent.map((student, ind) => {
                return (
                  <ul
                    key={5}
                    className="space-y-2 text-gray-700 dark:text-gray-300"
                  >
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {student.email}
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {student.mobile}
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {student.address}
                    </li>
                  </ul>
                );
              })}
          </div>
        </div>
      </div>
      <div className="mt-10"></div>
    </>
  );
}
