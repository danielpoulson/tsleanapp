/**
 * Sample for Gauge default sample
 */
import React, { Component } from "react";
import {
  CircularGaugeComponent,
  Annotations,
  AnnotationsDirective,
  AnnotationDirective,
  AxesDirective,
  AxisDirective,
  Inject,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective
} from "@syncfusion/ej2-react-circulargauge";
// import { SampleBase } from "../common/sample-base";
import "./gauge.css";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

interface Props {
  name: string;
  value: number;
}

export default class Gauge extends Component<Props> {
  load = () => {
    console.log("Loading");
  };
  render() {
    return (
      <div className="control-panel">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <CircularGaugeComponent
            load={this.load}
            id={this.props.name}
            height="330px"
            width="420px"
            centerY="60%"
          >
            <Inject services={[Annotations]} />
            <AxesDirective>
              <AxisDirective
                radius="95%"
                startAngle={230}
                endAngle={130}
                majorTicks={{ width: 0 }}
                lineStyle={{ width: 0 }}
                minorTicks={{
                  color: "white",
                  width: 1,
                  interval: 5,
                  height: 20
                }}
                labelStyle={{
                  font: {
                    fontFamily: "Roboto",
                    size: "14px",
                    fontWeight: "Bold",
                    color: "#AEB6BF"
                  },
                  offset: 5
                }}
              >
                <PointersDirective>
                  <PointerDirective
                    value={this.props.value}
                    radius="70%"
                    pointerWidth={10}
                    color={"#17202A"}
                    cap={{
                      radius: 10,
                      color: "#17202A",
                      border: {
                        color: "#17202A",
                        width: 5
                      }
                    }}
                    needleTail={{
                      length: "0%",
                      color: "#FFFFF"
                    }}
                  />
                </PointersDirective>
                <RangesDirective>
                  <RangeDirective
                    start={0}
                    end={55}
                    startWidth={20}
                    endWidth={20}
                    color="#EF5350"
                  />
                  <RangeDirective
                    start={55}
                    end={100}
                    startWidth={20}
                    endWidth={20}
                    color="#66BB6A"
                  />
                </RangesDirective>
                <AnnotationsDirective>
                  <AnnotationDirective
                    content={`<div><span class="lapp__gauge-title" >OEE = ${
                      this.props.value
                    }%</span></div>`}
                    angle={180}
                    zIndex="1"
                    radius="30%"
                  />
                  <AnnotationDirective
                    content={`<div><span class="lapp__gauge-title">${
                      this.props.name
                    }</span></div>`}
                    angle={180}
                    zIndex="1"
                    radius="50%"
                  />
                </AnnotationsDirective>
              </AxisDirective>
            </AxesDirective>
          </CircularGaugeComponent>
        </div>
      </div>
    );
  }
}
