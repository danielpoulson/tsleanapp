import React from "react";
import { useRoutes } from "hookrouter";
import Routes from "./router";
import "./App.css";

function App() {
  const match = useRoutes(Routes);
  return <div className="App">{match}</div>;
}

export default App;
