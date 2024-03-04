import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import SocketProvider from "./context/Socket";
import store from "./store/index";

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>,
  document.getElementById("root")
);
