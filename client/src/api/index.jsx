import axios from "axios";
//import decode from "jwt-decode";

// create a function to decode jwt token without jwt-decode

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    const userToken = JSON.parse(userData).token;

    req.headers.Authorization = `Bearer ${userToken}`;

    // if (decodedToken.exp * 1000 < new Date().getTime()) {
    //   window.location.href = "/login";
    //   //alert("Your token expired, please sign in again");
    // }
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
export const getChats = () =>
  API.get("/chats", {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
//export const getChat = (chatId) => API.get(`/chats/${chatId}`);
export const createPrivateChat = (creatorId, partnerId, swapDetails) =>
  API.post(
    "/chats/private",
    { creatorId, partnerId, swapDetails },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    }
  );

export const deleteChat = (userId, chatId) => {
  API.delete(`/chats/${userId}/${chatId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });
};
export const getChatsByUserId = (userId) =>
  API.get(`/chats/chat/${userId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });

export const getChatById = (chatId) =>
  API.get(`/chats/${chatId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });

export const getChat = (userId, chatId) =>
  API.get(`/chats/chat/${userId}/${chatId}`, {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
  });

export const createMessage = (userId, chatId, text) =>
  API.post(
    `/chats/chat/${userId}/${chatId}`,
    { text },
    {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    }
  );
