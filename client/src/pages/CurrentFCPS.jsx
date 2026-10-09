import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { AiFillFilePdf } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

export default function CurrentFCPS() {
  const [allStudent, setAllStudent] = useState([]);
  const [filter, setFilter] = useState("");

  let navigate = useNavigate();

  async function getData() {
    try {
      const res = await axios("http://localhost:3001/fcpspresent");
      const data = await res.data;
      console.log("GET DATA: ", data);
      setAllStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  // =============== SEARCH CODE ===============
  const lowercasedFilter = filter.toLowerCase();

  const filteredData = allStudent.filter((item) => {
    if (
      (item["sname"] &&
        item["sname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["fname"] &&
        item["fname"].toLowerCase().includes(lowercasedFilter)) ||
      (item["batch"] &&
        item["batch"].toLowerCase().includes(lowercasedFilter)) ||
      (item["rollno"] &&
        item["rollno"].toLowerCase().includes(lowercasedFilter)) ||
      (item["teacher_id"] &&
        item["teacher_id"].teacher &&
        item["teacher_id"].teacher.toLowerCase().includes(lowercasedFilter))
      // (item["supervisor_id"] &&
      //   item["supervisor_id"].super_name &&
      //   item["supervisor_id"].super_name
      //     .toLowerCase()
      //     .includes(lowercasedFilter))
    ) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const getPDF = () => {
    console.log("pdf");

    const doc = new jsPDF({
      orientation: "landscape",
    });
    var totalPagesExp = "{total_pages_count_string}";

    autoTable(doc, {
      html: "#my-table",
      styles: { fontSize: 8 },
      margin: { top: 22, left: 10, right: 10 },
      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(10, 10, "School of Postgraduate Studies - DUHS");
        doc.setFontSize(15);
        doc.text(10, 18, "FCPS-II Current Trainees Report");

        doc.setFontSize(9);
        let dt = new Date();
        doc.text(
          260,
          18,
          "Print: " +
            dt.getDate() +
            "-" +
            (dt.getMonth() + 1) +
            "-" +
            dt.getFullYear(),
        );

        // Footer
        var str = "Page " + doc.internal.getNumberOfPages();
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save("all_student_report.pdf");

    // ----------------- End PDF -------------------
  };

  return (
    <>
      <Navbar />

      <h2 className="text-3xl text-center font-bold text-slate-700 mt-9 mb-2">
        All Students Record
      </h2>
      <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
        FCPS-II Postgraduate Trainees
      </h2>

      <div className="flex justify-center">
        <div>
          <input
            type="text"
            value={filter}
            placeholder="Search any..."
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            className="border w-80 border-gray-400 h-9 rounded px-3 bg-gray-50 placeholder:text-slate-400"
          />
        </div>

        {/* <button
          type="button"
          onClick={getPDF}
          className="bg-white text-sm font-normal duration-300 text-slate-800 hover:text-white hover:bg-slate-700 border border-slate-800 rounded-md ml-3 py-0 px-3"
        >
          Get Print
        </button> */}

        {/* bg-gradient-to-r from-slate-900 to-slate-700 */}

        <div className="inline-flex hover:bg-slate-700 hover:cursor-pointer hover:scale-105 items-center h-9 ml-2 text-white bg-slate-800 rounded">
          <button
            type="button"
            onClick={() => {
              navigate("/addstudent");
            }}
            className="px-5 py-1.5 flex text-sm font-medium"
          >
            <FaUser size={"16px"} />
            &nbsp; Add Trainee
          </button>
        </div>
      </div>

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
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData &&
                filteredData.map((student, ind) => {
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
                          <Link to={`/detail/${student._id}`}>
                            <BiSolidCommentDetail
                              size={"20px"}
                              color="#fd79a8"
                            />
                          </Link>
                          <Link to={`/upload/${student._id}`}>
                            <GrDocumentPdf size={"20px"} color="#74b9ff" />
                          </Link>
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
  );
}
