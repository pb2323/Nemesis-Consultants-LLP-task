import React from "react";
import { Redirect } from "react-router-dom";
import BarChart from "../components/BarChart";
import Logout from "../components/Logout";
import  PieChart  from "../components/PieChart";

const homePage = () => {
  if (JSON.parse(localStorage.getItem("shouldProceed")))
    return (
      <div>
        <Logout />
        {JSON.parse(localStorage.getItem("uname")) === "John" ? (
          <BarChart />
        ) : (
          <PieChart />
        )}
      </div>
    );
  else return <Redirect to="/login" />;
};

export default homePage;
