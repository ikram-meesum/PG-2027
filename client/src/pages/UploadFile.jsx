import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import axios from "axios";
// import path from "path";

export default function UploadFile() {
  const { id } = useParams();
  console.log(id);

  const [f_name, setFileName] = useState("");
  const [pdf_file, setPDFfile] = useState([]);
  const [allStudent, setAllStudent] = useState([]);

  async function getData(id) {
    console.log("id: ", id);
    try {
      const res = await axios(`http://localhost:3001/fcpspresent/${id}`);
      const data = await res.data;
      console.log("SINGLE DATA: ", data);
      setAllStudent(data);
    } catch (err) {
      console.log("Error occured from getdata method: ", err);
    }
  }

  // this.state = {
  //           pdf_file : []
  //       }

  // this.state = {
  //           f_name : ''
  //       }

  const showFiles = () => {
    axios
      .get("http://localhost:3001/showfiles/" + id)
      .then((response) => {
        console.log(response.data);
        setPDFfile(response.data);
        // this.setState({ pdf_file: response.data });
        //console.log(this.state.pdf_file.length);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/upload_dox/" + id)
      .then((response) => {
        // handle success
        console.log("created: ", response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    showFiles();
    getData(id);
  }, [pdf_file]);

  const fileUpload = (e) => {
    e.preventDefault();
    console.log("test");
    var formData = new FormData();
    var imagefile = document.querySelector("#file");
    // console.log(imagefile);
    formData.append("filename", imagefile.files[0]);
    console.log("form data: ", formData);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:3001/upload_dox/" + id, formData, config)
      .then(function (response) {
        console.log("open file: ", response.data);
        alert("Your selected file has been uploaded on server!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onchangeImage = (e) => {
    console.log(e.target.value);
    setFileName(e.target.value);
    // this.setState({ f_name: e.target.value });
  };

  // onChange={this.onchangeImage}

  const openPDF = (file_name) => {
    // console.log("ok", this.props.match.params.enroll_no);
    //e.preventDefault();
    // path.extname
    // 2. Extract everything after the last dot
    let ext = file_name.substring(file_name.lastIndexOf(".") + 1);
    // let ext = path.extname(file_name);
    ext = "." + ext;
    console.log("ext: ", ext);

    if (ext === ".pdf") {
      axios("http://localhost:3001/upload_dox/" + id + "/" + file_name, {
        method: "GET",
        responseType: "blob", //Force to receive data in a Blob Format
      })
        .then((response) => {
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // else if (ext === ".jpg") {
    //   axios(
    //     "http://" +
    //       ip.address +
    //       ":3001/upload_dox/" +
    //       this.props.match.params.enroll_no +
    //       "/" +
    //       file_name,
    //     {
    //       method: "GET",
    //       //responseType: 'blob' //Force to receive data in a Blob Format
    //     },
    //   )
    //     .then((response) => {
    //       //Create a Blob from the PDF Stream
    //       // const file = new Blob(
    //       // [response.data],
    //       // {type: 'application/jpeg'});
    //       //Build a URL from the file
    //       const fileURL = URL.createObjectURL(file_name);
    //       //Open the URL on new Window
    //       window.open(fileURL);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    else {
      alert("Format is not supported");
    }
  };

  return (
    <>
      <Navbar />
      {/* grid start */}
      <div className="grid grid-cols-2 gap-4 w-4/5 mx-auto border border-gray-200 px-5 py-5 mt-5">
        <div className="">
          <h2 className="text-2xl font-bold mb-8 text-slate-800">
            Upload File
          </h2>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={fileUpload}
          >
            <label
              htmlFor="file-upload"
              className="text-slate-700 text-sm font-medium mb-2 block"
            >
              Please select pdf file:
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={onchangeImage}
              // id="file-upload"
              id="file"
              className="text-slate-600 font-medium text-sm border border-slate-200 rounded-md cursor-pointer
         focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
         file:cursor-pointer file:border-0 file:py-2 file:px-3 file:mr-4
         file:bg-gray-100 hover:file:bg-gray-200 file:text-slate-500
         dark:text-slate-400 dark:border-neutral-700 dark:file:bg-neutral-800 dark:hover:file:bg-neutral-700"
              name="uploaded_file"
            />

            <button
              type="submit"
              className="bg-slate-800 hover:cursor-pointer text-white px-3 py-2 ml-2 text-sm rounded-md"
            >
              Upload File
            </button>
          </form>
        </div>
        {/* <!-- ... --> */}
        <div className="">
          <p className="text-gray-500 font-semibold">Trainee Information</p>
          {allStudent &&
            allStudent.map((student, index) => {
              return (
                <>
                  <h1
                    key={index + 1}
                    className="text-lg font-semibold text-slate-700 mt-2"
                  >
                    {student.sname}
                  </h1>
                  <h1 className="font-semibold text-slate-700 mb-1">
                    {student.fname}
                  </h1>
                  <p className="text-slate-600">
                    {student["depart_id"]["ward_name"]}
                  </p>
                  <p className="text-slate-600">
                    {student["supervisor_id"]["super_name"]}
                  </p>
                </>
              );
            })}
        </div>
      </div>
      {/* grid end */}

      <section className="w-4/5 mx-auto">
        {/* show all pdf files */}
        <>
          {}
          <h2 className="text-2xl font-semibold mt-8">All uploaded files</h2>
          <div className="my-6">
            <div className="w-l/2 mx-auto border border-slate-200 rounded-md overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
                  <tr className="bg-slate-800">
                    <th scope="col" className="text-white px-4 py-3.5">
                      S #
                    </th>
                    <th scope="col" className="text-white px-4 py-3.5">
                      File Name
                    </th>
                    <th scope="col" className="text-white px-4 py-3.5">
                      Open
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-slate-200">
                  {pdf_file &&
                    pdf_file.map((student, ind) => {
                      return (
                        <tr key={ind} className="hover:bg-slate-50">
                          <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                            {ind + 1}
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                            {student}
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-900 whitespace-nowrap">
                            <button
                              className="bg-slate-100 text-slate-800 text-sm hover:cursor-pointer rounded-md py-1 px-3"
                              onClick={() => openPDF(student)}
                            >
                              Show File
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      </section>
    </>
  );
}
