import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Todo } from "./pages/Todo";



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <Todo/>
  </Provider>
);
