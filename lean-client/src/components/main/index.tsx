import React, { useState, useEffect } from "react";
import MainList from "./main-list";
import NavBar from "../../layout/navbar";
import { getOEEData } from "../../api/oee.api";

function Mattec() {
  const [oeeData, getOEE] = useState([]);

  useEffect(() => {
    onLoadData();
  }, []);

  const onLoadData = () => {
    getOEEData().then((oee: any) => {
      getOEE(oee.data);
    });
  };

  return (
    <div>
      <header className="App-header">
        <div className="page-title">Mattec Data</div>
      </header>
      <NavBar />
      <div className="container">
        <MainList oeeData={oeeData} />
      </div>
    </div>
  );
}

export default Mattec;
