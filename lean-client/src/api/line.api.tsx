import axios from "axios";
import "./default-header";

export function getLineData(line: number) {
  const url = `/line/${line}`;
  return axios.get(url).catch(error => {});
}

export function getMonthData(line: number) {
  const url = `/monthlyline/${line}`;
  return axios.get(url).catch(error => {});
}
