import React, { createRef, useEffect } from "react";
import Chart from "chart.js";
import classes from "./bar.module.css";

const Bar = ({ data, labels }) => {
  const chartRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const myChartRef = chartRef.current;

    if (myChartRef) {
      myChartRef.getContext("2d");
    }

    let bgColors: string[] = [];
    let bcColors: string[] = [];
    data.forEach(d => {
      if (d < 55) {
        bcColors.push("rgba(255, 99, 132)");
        bgColors.push("rgba(255, 99, 132, 0.2)");
      } else {
        bcColors.push("rgba(75, 192, 192)");
        bgColors.push("rgba(75, 192, 192, 0.2)");
      }
    });

    new Chart(myChartRef as HTMLCanvasElement, {
      type: "bar",
      data: {
        labels:
          labels.length === data.length
            ? labels
            : new Array(data.length).fill("Data"),
        datasets: [
          {
            label: "% OEE",
            data: data,
            backgroundColor: bgColors,
            borderColor: bcColors,
            borderWidth: 1
          },
          {
            label: "Target",
            data: [55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55, 55],
            fill: false,
            borderColor: "#FF0000",

            // Changes this dataset to become a line
            type: "line",
            borderWidth: 1
          }
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 16,
          fontStyle: "bold",
          padding: 20,
          text: "Yearly OEE Report"
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 80
              }
            }
          ]
        },
        elements: { point: { radius: 0 } }
      }
    });
  });
  return (
    <div className={classes.graphContainer}>
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
};

export default Bar;
