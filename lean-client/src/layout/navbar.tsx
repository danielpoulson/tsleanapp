import React from "react";
import { A } from "hookrouter";
import "./styles.css";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navBanner">
        <nav className="container navbar">
          <div className="navContainer">
            <A className="navbaritem" id="homeTab" href="/line/1">
              <i className="fas fa-clock" /> Line 1
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="requestTab" href="/line/2">
              <i className="fas fa-clock" /> Line 2
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="ticketTab" href="/line/3">
              <i className="fas fa-clock" /> Line 3
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="ticketTab" href="/line/4">
              <i className="fas fa-clock" /> Line 4
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="ticketTab" href="/line/5">
              <i className="fas fa-clock" /> AXO1
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="ticketTab" href="/line/6">
              <i className="fas fa-clock" /> AXO2
            </A>
          </div>
          <div className="navContainer">
            <A className="navbaritem" id="ticketTab" href="/line/7">
              <i className="fas fa-clock" /> AXO3
            </A>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
