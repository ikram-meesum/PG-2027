import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams, Link } from "react-router";

export default function TestUpload() {
  let { id } = useParams();
  console.log("upload: ", id);

  let navigate = useNavigate();

  useEffect(() => {
    if (name == "fcps") {
      navigate("/current-fcps");
    } else {
      console.log(`/upload/${id}`);
      navigate(`/upload/${id}`);
    }
  });

  return (
    <>
      <Navbar />
      <div>TestUpload</div>
    </>
  );
}
