import * as api from "../api";
import {
  CREATE_CHAT,
  DELETE_CHAT,
  FETCH_CHAT,
  FETCH_CHATS,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
} from "../constants/actionTypes";
import { toast } from "react-toastify";

export const fetchChats = (userid) => async (dispatch) => {
  try {
    const { data: chats } = await api.getChatsByUserId(userid);
    dispatch({ type: FETCH_CHATS, payload: chats });
  } catch (error) {
    console.log(error);
  }
};

export const fetchChat = (userId, chatId) => async (dispatch) => {
  try {
    const { data: chat } = await api.getChat(userId, chatId);
    dispatch({ type: FETCH_CHAT, payload: chat });
  } catch (error) {
    console.log(error);
  }
};

export const createPrivateChat =
  (creatorId, partnerId, swapDetails, socket) => async (dispatch) => {
    try {
      const { data: chat } = await api.createPrivateChat(
        creatorId,
        partnerId,
        swapDetails
      );
      chat.members.map((member) => socket.createChat(member.id));
      dispatch({ type: CREATE_CHAT, payload: chat });
      toast.success("Chat created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Chat creation failed");
    }
  };

export const deleteChat = (userId, chatId, socket) => async (dispatch) => {
  try {
    const { data: chat } = await api.getChatById(chatId);
    console.log(chat.members);

    await api.deleteChat(userId, chatId);
    chat.members.map((member) => socket.deleteChat(member.id));
    dispatch({ type: DELETE_CHAT, payload: chatId });
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage =
  (userId, chatId, text, socket) => async (dispatch) => {
    try {
      const { data: message } = await api.createMessage(userId, chatId, text);
      socket.sendMessage(chatId, message);
      dispatch({ type: SEND_MESSAGE, payload: { chatId, message } });
    } catch (error) {
      console.log(error);
    }
  };

export const receiveMessage = (chatId, message) => {
  return { type: RECEIVE_MESSAGE, payload: { chatId, message } };
};
