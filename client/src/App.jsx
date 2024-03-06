/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { autoSignIn, signOut } from "./actions/auth";
import { fetchChats } from "./actions/chats";
import { SocketContext } from "./context/Socket";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./auth-config";
import LoadingPage from "./pages/LoadingPage";
import CookieConsent from "react-cookie-consent";

import "./index.css";
import UserPage from "./pages/UserPage";

function App() {
  const randomImage = () => {
    const random = Math.floor(Math.random() * 6) + 1;
    console.log(random);
    sessionStorage.setItem("randomImage", random);
  };
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const chats = useSelector((state) => state.chats);
  const user = sessionStorage.getItem("user");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
    randomImage();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      dispatch(autoSignIn());
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } else {
      dispatch(signOut());
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  useEffect(() => {
    let userid = sessionStorage.getItem("user");
    dispatch(fetchChats(userid));
    socket.subscribeChats(user);
    chats.map((chat) => socket.subscribeChatMessages(chat.id));
  }, []);

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

  if (loading) return <LoadingPage />;
  // if (!user || user?.isBlocked) return <LoginPage />;
  else
    return (
      <>
        <UserPage instance={msalInstance} />
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="cookieConsent"
          style={{ background: "#fefefe", color: "#000000" }}
          buttonStyle={{
            background: "#e0211a",
            color: "#ffffff",
            fontSize: "13px",
          }}
          expires={150}
        >
          This website only uses Cookies for functional purposes{" "}
        </CookieConsent>
      </>
    );
}

export default App;
