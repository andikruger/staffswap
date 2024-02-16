import * as api from "../api";
import { toast } from "react-toastify";
import {
  CREATE_CHAT,
  DELETE_CHAT,
  FETCH_CHAT,
  FETCH_CHATS,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants/actionTypes";

export const fetchChats = () => async (dispatch) => {
  try {
    console.log("fetchChats");
    const { data: chats } = await api.getChats();
    dispatch({ type: FETCH_CHATS, payload: chats });
  } catch (error) {
    console.log(error);
  }
};

export const fetchChat = (chatId) => async (dispatch) => {
  try {
    const { data: chat } = await api.getChat(chatId);
    dispatch({ type: FETCH_CHAT, payload: chat });
  } catch (error) {
    console.log(error);
  }
};

export const createPrivateChat =
  (creatorId, partnerId, socket) => async (dispatch) => {
    try {
      const { data: chat } = await api.createPrivateChat(creatorId, partnerId);
      chat.members.map((member) => socket.createChat(member.id));
      dispatch({ type: CREATE_CHAT, payload: chat });
      toast.success("Chat created successfully");
    } catch (error) {
      console.log(JSON);
      toast.error("Chat already exists");
    }
  };

export const deleteChat = (chatId, socket) => async (dispatch) => {
  try {
    const { data: chat } = await api.getChat(chatId);
    await api.deleteChat(chatId);
    chat.members.map((member) => socket.deleteChat(member.id));
    dispatch({ type: DELETE_CHAT, payload: chatId });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = (chatId, text, socket) => async (dispatch) => {
  try {
    const { data: message } = await api.createMessage(chatId, text);
    socket.sendMessage(chatId, message);
    dispatch({ type: SEND_MESSAGE, payload: { chatId, message } });
  } catch (error) {
    console.log(error);
  }
};

export const receiveMessage = (chatId, message) => {
  return { type: RECEIVE_MESSAGE, payload: { chatId, message } };
};
