import React from "react";
import Navbar from "../components/Navbar";
import { CiSettings } from "react-icons/ci";
import { CiSun } from "react-icons/ci";
import { DiAtom } from "react-icons/di";
import { DiStreamline } from "react-icons/di";
import { CgAdidas } from "react-icons/cg";
import { CgClipboard } from "react-icons/cg";
import { CgComment } from "react-icons/cg";
import { Link } from "react-router";

export default function Home() {
  let userName = sessionStorage.getItem("user_role");
  console.log(userName);

  return (
    <>
      <Navbar />
      <section>
        <h2 className="text-slate-700 text-center mt-14 font-bold text-3xl">
          School of Postgraduate Studies
        </h2>
        <p className="text-gray-600 text-center mt-3 font-semibold">
          FCPS-II and MCPS Program
        </p>
        <p className="mt-20"></p>

        <div className="grid grid-cols-3 gap-4 w-4/5 mx-auto">
          <div className="">
            <Link to={"/current-fcps"}>
              <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700">
                <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                  <CiSettings className="pl-3" size={"63px"} />

                  <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        Current FCPS Trainees
                      </h5>
                    </div>
                    <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                      Detail of FCPS Trainees
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* second */}
          {/* {userName !== "user" ? "e" : "s"} */}
          <div>
            <div>
              <Link to={"/addstudent"}>
                <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700 shadow-none">
                  <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                    <CgComment className="pl-3" size={"63px"} />

                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          Add New FCPS-II
                        </h5>
                      </div>
                      <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        Insert FCPS Trainees
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* third */}
          <div>
            <div>
              <Link to={"/add-depart"}>
                <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700 shadow-none">
                  <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                    <DiStreamline className="pl-3" size={"63px"} />

                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          Department
                        </h5>
                      </div>
                      <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        List of Departments
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* forth */}
          <div>
            <div>
              <Link to={"/supervisor"}>
                <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700 shadow-none">
                  <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                    <CgAdidas className="pl-3" size={"63px"} />

                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          Supervisor
                        </h5>
                      </div>
                      <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        Detail of Supervisor
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* fifth */}
          <div>
            <div>
              <Link to={"/home"}>
                <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700 shadow-none">
                  <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                    <CgClipboard className="pl-3" size={"63px"} />

                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          Current MCPS Trainees
                        </h5>
                      </div>
                      <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        Detail of MCPS Trainees
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* sixth */}
          <div>
            <div>
              <Link to={"/"}>
                <div className="relative border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer flex w-full bg-gray-50 max-w-[20rem] flex-col rounded-xl bg-clip-border text-gray-700 shadow-none">
                  <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-3 text-gray-700 shadow-none">
                    <CiSun className="pl-3" size={"63px"} />

                    <div className="flex w-full flex-col gap-0.5">
                      <div className="flex items-center justify-between">
                        <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                          Coming Soon
                        </h5>
                      </div>
                      <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
                        coming soon...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- component --> */}
      </section>
    </>
  );
}
