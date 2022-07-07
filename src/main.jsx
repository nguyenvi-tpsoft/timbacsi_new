import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vendor/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSageMiddleware from "redux-saga";
import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSageMiddleware();
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
