import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import SocketProvider from "./context/Socket";
import store from "./store/index";
import App from "./App.jsx";
import "./index.css";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./auth-config.js";
import "bootstrap/dist/css/bootstrap.min.css";

const msalInstance = new PublicClientApplication(msalConfig);

if (
  !msalInstance.getActiveAccount() &&
  msalInstance.getAllAccounts().length > 0
) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App instance={msalInstance} />
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);
