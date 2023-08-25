import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Selling from "./Selling";
import Clients from "./Clients";
import Inventory from "./Inventory";
import Info from "./Info";
import Settings from "./Settings";
import Transactions from "./Transactions";

const Home = () => {
  useEffect(() => {
    window.api.command({ type: "fullscreen", payload: null });
  }, []);

  return (
    <div className="home">
      <Nav />

      <Routes>
        <Route path="/selling" exact element={<Selling />} />
        <Route path="/transactions" exact element={<Transactions />} />
        <Route path="/clients/*" exact element={<Clients />} />
        <Route path="/info" exact element={<Info />} />
        <Route path="/inventory/*" exact element={<Inventory />} />
        <Route path="/settings/*" exact element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Home;
