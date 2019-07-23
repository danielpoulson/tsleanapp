import React from "react";
import DataList from "../data-list";
import "./styles.css";

interface Props {
  oeeData: Array<any>;
}

export default function MainList({ oeeData }: Props) {
  let oeeList: any[] = [];
  const machName = [
    "Line 1",
    "Line 2",
    "Line 3",
    "Line 4",
    "AX01",
    "AXO2",
    "AX03"
  ];

  if (oeeData !== undefined && oeeData.length > 0) {
    oeeList = oeeData.map((e, inx) => {
      return (
        <div key={inx}>
          <div className="row pl-3 linetitle">{machName[e.machno - 1]}</div>
          <DataList line={e} />
        </div>
      );
    });
  }
  return <div>{oeeList}</div>;
}
