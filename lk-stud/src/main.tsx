
import { createRoot } from "react-dom/client";
import { App } from "./app/app";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
