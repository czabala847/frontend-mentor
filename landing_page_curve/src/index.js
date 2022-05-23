import "bootstrap";
import "./styles/index.scss";

import { Home } from "@pages/Home";

(async function App() {
  const main = null || document.getElementById("main");
  main.innerHTML = await Home();
})();
