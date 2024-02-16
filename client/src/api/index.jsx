import axios from "axios";
//import decode from "jwt-decode";

// create a function to decode jwt token without jwt-decode

function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

//const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });
const API = axios.create({ baseURL: "http://localhost:8000" });
API.interceptors.request.use((req) => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    const userToken = JSON.parse(userData).token;

    req.headers.Authorization = `Bearer ${userToken}`;

    const decodedToken = parseJwt(userToken);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      window.location.reload(false);
      alert("Your token expired, please sign in again");
    }
  }
  return req;
});

// USERS
export const getUsers = () => API.get("/users");
export const signUp = (newUserData) => API.post("users/signUp", newUserData);
export const signIn = (userData) => API.post("/users/signIn", userData);
export const validateUser = (userData) =>
  API.post("/users/validateUser", userData);

// CHATS
export const getChats = () => API.get("/chats");
export const getChat = (chatId) => API.get(`/chats/${chatId}`);
export const createPrivateChat = (creatorId, partnerId) =>
  API.post("/chats/private", { creatorId, partnerId });
export const createMessage = (chatId, text) =>
  API.post(`/chats/${chatId}`, { text });

export const deleteChat = (chatId) => API.delete(`/chats/${chatId}`);
