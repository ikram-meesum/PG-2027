import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams, Link } from "react-router";

export default function TestAdd() {
  let { name } = useParams();
  console.log(name);

  let navigate = useNavigate();

  useEffect(() => {
    if (name == "fcps") {
      navigate("/current-fcps");
    } else if (name == "upload") {
      navigate("/current-fcps");
    }
  });

  return (
    <>
      <Navbar />
      <div>TestAdd {name}</div>
    </>
  );
}
