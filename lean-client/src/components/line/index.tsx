import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import Gauge from "../gauge/gauge";
import OEEBar from "../bar/oeeBar";
import DownBar from "../bar/downBar";
import DataList from "../data-list";
import { getLineData } from "../../api/line.api";
import { oeeData, yearLabels } from "./mockData";
import "./line.css";

const def = {
  day: {
    machno: 1,
    runtime: 0,
    downtime: 0,
    downpc: "",
    units: 0,
    avail: "0",
    perf: "0",
    oee: "0",
    idle: 0,
    unitsmin: "0",
    downnone: "0"
  },
  month: {
    oee: "0"
  },
  oeeTrend: {
    oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  downPareto: {
    labels: [],
    values: []
  }
};

const machName = [
  "Line 1",
  "Line 2",
  "Line 3",
  "Line 4",
  "AX01",
  "AXO2",
  "AX03"
];

function Line(props) {
  const [lineData, loadLineData] = useState(def);
  useEffect(() => {
    getLineData(props.id).then((line: any) => {
      loadLineData(line.data);
    });
  }, [props]);

  return (
    <div>
      <header className="App-header">
        <div className="page-title">
          {`${machName[lineData.day.machno - 1]} - Mattec Data`}
        </div>
        <div className="link_bar float-right">
          <A href={"/"}>Back To Main</A>
        </div>
      </header>
      <div className="container">
        <div className="app-body">
          <div className="app-data-row">
            <DataList line={lineData.day} />
          </div>
          <div className="app-left-column">
            <Gauge name="Current" value={+lineData.day.oee} />
          </div>
          <div className="app-right-column">
            {oeeData ? (
              <OEEBar data={lineData.oeeTrend.oeedata} labels={yearLabels} />
            ) : (
              ""
            )}
          </div>

          <div className="app-left-column">
            <Gauge name="Last 30 days" value={+lineData.month.oee} />
          </div>
          <div className="app-right-column">
            <DownBar
              data={lineData.downPareto.values}
              labels={lineData.downPareto.labels}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Line;
