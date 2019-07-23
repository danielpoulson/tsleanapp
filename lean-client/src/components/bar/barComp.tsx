import React from "react";
import Bar from "./oeeBar";

const BarComp = ({ data, labels }) => {
  //   const [data, setData] = useState([]);
  //   const [labels, setLabels] = useState([]);
  //   setData(managerData);
  //   setLabels(yearLabels);

  return (
    <div className="container-bar">
      {data ? <Bar data={data} labels={labels} /> : ""}
    </div>
  );
};

export default BarComp;
