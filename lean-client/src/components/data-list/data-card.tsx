import React from 'react'
import classes from './data-list.module.css'

export default function DataCard({ title, data }) {
  let items = []
  if (data !== undefined) {
    items = data.map((d, i) => (
      <div className={classes.cardBody} key={i}>
        <div className={classes.cardColLeft}>{d.name} : </div>
        <div className={classes.cardColRight}>
          {d.value}
          <span className={`${d.light} ${d.lightColor}Light`}>
            <i className="fas fa-lightbulb" />
          </span>
        </div>
      </div>
    ))
  }
  return (
    <div className={`flex-fill ${classes.datacard}`}>
      <div className={classes.cardtitle}>{title}</div>
      <div className="card-body">{items}</div>
    </div>
  )
}
