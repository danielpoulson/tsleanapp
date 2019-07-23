import React from 'react'
import DataCard from './data-card'
// import classes from "./data-list.module.css";

export default function DataList({ line }) {
  const timeData = [
    { name: 'Run Time', value: line.runtime, light: 'invisible' },
    { name: 'Down Time', value: line.downtime, light: 'invisible' },
    { name: 'Idle Time', value: line.idle, light: 'invisible' }
  ]
  const perfData = [
    {
      name: 'Available',
      value: `${line.avail} %`,
      lightColor: line.avail > 75 ? 'green' : 'red'
    },
    {
      name: 'Performance',
      value: `${line.perf} %`,
      lightColor: line.perf > 75 ? 'green' : 'red'
    },
    {
      name: 'Quality',
      value: '100 %',
      lightColor: 100 > 75 ? 'green' : 'red'
    },
    {
      name: 'OEE',
      value: `${line.oee} %`,
      lightColor: line.oee > 45 ? 'green' : 'red'
    }
  ]
  const unitData = [
    { name: 'Units', value: line.units, light: 'invisible' },
    { name: 'Units / min', value: line.unitsmin, light: 'invisible' }
  ]
  const downData = [
    { name: 'Down', value: `${line.downpc} %`, light: 'invisible' },
    {
      name: 'Down None',
      value: `${line.downnone} %`,
      lightColor: line.downnone < 40 ? 'green' : 'red'
    }
  ]
  return (
    <div className="d-flex">
      <DataCard title="Time" data={timeData} />
      <DataCard title="Performance" data={perfData} />
      <DataCard title="Units" data={unitData} />
      <DataCard title="Down" data={downData} />
    </div>
  )
}
