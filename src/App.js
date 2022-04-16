import Game from "features/game/Game";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loby from "./features/game/Loby";
import { GAME, HOME } from "./lib/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<Loby />} />
        <Route path={GAME} element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
