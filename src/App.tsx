import "./App.css";

import Router from "./router";
import keepAwake from "./services/keep-awake";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    keepAwake();
  }, []);

  return <Router />;
}

export default App;
