import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ip } from "../components/ipAddress";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

export default function EditSupervisor() {
  const [supervisor, setSupervisor] = useState([]);
  const [depart, setDepart] = useState([]);

  let userName = sessionStorage.getItem("user_role");
  console.log(userName);
  if (userName == "user") {
    navigate("/login");
  }

  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id; ", id);

  //   const getSupervisorData = () => {
  //     axios
  //       .get("http://" + ip.address + ":3001/current_supervisors")
  //       .then((response) => {
  //         setSupervisor(response.data);
  //       })
  //       .catch((error) => {
  //         console.log("Error from use effect function: ", error);
  //       });
  //   };

  const fetchData = async () => {
    try {
      //   setLoading(true);
      // 2. Await the axios call directly
      const response = await axios.get(
        "http://" + ip.address + ":3001/editsupervisor/" + id,
      );
      console.log("supervisor: ", response.data);
      setSupervisor(response.data);
    } catch (err) {
      // 3. Handle errors cleanly using try/catch
      //   setError(err.message || "Something went wrong");
      console.log(err.message);
    } finally {
      //   setLoading(false);
    }
  };

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

  useEffect(() => {
    getDepart();
    // fetchData();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(
        "http://" + ip.address + ":3001/editsupervisor/" + id,
      );
      const data = await response.json();
      console.log("before update: ", data);
      //   SETDEPARTID(data.depart_id);
      console.log("supername: ", data[0].super_name);

      return {
        supervisor: data[0].super_name,
        email: data[0].email,
        mobile: data[0].mobile,
        empno: data[0].emp_id,
        depart: data[0].depart_id["_id"],
        // classes: data.class_name,
        // present: data.present,
      };
    },
  });

  const onSubmit = async (data) => {
    // console.log("put: ", id);
    console.log("all data: ", data);

    try {
      // 2. Use await to pause execution until the promise resolves
      const response = await axios.put(
        "http://" + ip.address + ":3001/editsupervisor/" + id,
        {
          supervisor: data.supervisor,
          email: data.email,
          mobile: data.mobile,
          empno: data.empno,
          depart: data.depart,
        },
      );
      console.log("Success:", response.data);
      alert("Data updated successfully!");
      navigate("/supervisor");
    } catch (err) {
      console.error("Update failed:", err.message);
    } finally {
      // setLoading(false);
    }
    // ===========================================
    // if (userName === "user") {
    //   alert("You are not not allowed for insert record.");
    // } else {
    // axios
    //   .post("http://" + ip.address + ":3001/current_supervisors", {
    //     super_name: data.supervisor,
    //     depart_id: data.depart,
    //     email: data.email,
    //     mobile: data.mobile,
    //     emp_id: data.empno,
    //     // ins_name: data.ins_name,
    //   })
    //   .then((response) => {
    //     console.log("INSERTED: ", response.data);
    //     // navigate("/loading");

    //     // getSupervisorData();
    //     // toast.success("Supervisor inserted successfully.");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  };

  return (
    <>
      <Navbar />

      <h2 className="text-3xl text-center font-bold text-slate-700 mt-11 mb-2">
        Update Supervisor Record
      </h2>
      <h2 className="text-sm text-center font-medium mb-12 text-slate-600">
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
    </>
  );
}
