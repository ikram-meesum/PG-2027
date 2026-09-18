import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ip } from "../components/ipAddress";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";
import { IoMdPrint } from "react-icons/io";

export default function CurrentSupervisorReport() {
  const [depart, setDepart] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [dname, setDName] = useState("");

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
        doc.text(10, 10, "Dow University of Health Sciences");
        doc.setFontSize(15);
        doc.text(10, 18, "List of Department Supervisor Wise");

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
    doc.save("current-supervisor.pdf");

    // ----------------- End PDF -------------------
  };

  return (
    <>
      <Navbar />
      <h2 className="text-3xl text-center font-bold text-slate-700 mt-9 mb-2">
        FCPS-II Supervisor Report
      </h2>
      <h2 className="text-sm text-center font-medium mb-9 text-slate-600">
        FCPS-II Postgraduate Supervisors
      </h2>

      <div className="flex justify-end mr-5">
        <button
          type="button"
          onClick={getPDF}
          className="inline-flex items-center justify-center font-medium gap-2 hover:bg-slate-700 transition px-7 py-2 bg-slate-800 text-white rounded-lg"
        >
          {/* <FaFilePdf /> PDF */} <IoMdPrint /> Print
        </button>
      </div>

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
                      </td>
                      <td className="mr-3 py-3">{student.ispresent}</td> */}
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
