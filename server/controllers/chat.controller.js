const mongoose = require("mongoose");
const Chat = require("../models/chat.model.js");
const User = require("../models/user.model.js");
const ApiError = require("../error/ApiError.js");
require("express-async-errors");

exports.getChats = async (req, res) => {
  const { user } = req;
  const chats = await Chat.find({ "members.id": user.id });
  res.status(200).json(chats);
};

exports.getChat = async (req, res) => {
  const { user } = req;
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);
  if (!chat) throw ApiError.notFound("Chat not found");

  const userId = mongoose.Types.ObjectId(user.id).toString();
  const isMember = chat.members.find((member) => member.id === userId);
  if (!isMember) throw ApiError.forbidden("User is not a chat member");

  res.status(200).json(chat);
};

exports.createPrivateChat = async (req, res) => {
  const { creatorId, partnerId } = req.body;
  console.log("BODY:", req.body);

  if (creatorId === partnerId)
    throw ApiError.methodNotAllowed(
      "Cannot create a chat with your own account"
    );

  const user = await User.findById(partnerId);
  console.log("User:", user);
  console.log("PartnerId:", partnerId);
  const creator = await User.findById(creatorId);
  if (!user) {
    console.log("User not found");
    throw ApiError.notFound("User not found");
  }

  const doesChatExist = await Chat.findOne({
    type: "private",
    "members.id": { $all: [creatorId, partnerId] },
  });
  if (doesChatExist) throw ApiError.methodNotAllowed("Chat already exists");

  const newChat = new Chat({
    members: [
      {
        _id: creatorId,
        name: creator.name,
      },
      {
        _id: partnerId,
        name: user.name,
      },
    ],
  });

  await newChat.save();

  res.status(200).json(newChat);
};

exports.addMember = async (req, res) => {
  const { chatId } = req.params;
  const { email } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) throw ApiError.notFound("Chat not found");

  const newMember = await User.findOne({ email });
  if (!newMember) throw ApiError.notFound("User not found");

  const isMember = chat.members.find(
    (member) => member.id === mongoose.Types.ObjectId(newMember.id).toString()
  );
  if (isMember) throw ApiError.methodNotAllowed("User is already a member");

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { members: { _id: newMember.id, name: newMember.name } },
    },
    { new: true }
  );

  res.status(200).json(updatedChat.members);
};

exports.deleteChat = async (req, res) => {
  const { user } = req;
  const { chatId } = req.params;

  const chat = await Chat.findById(chatId);
  if (!chat) throw ApiError.notFound("Chat not found");

  const isMember = chat.members.find(
    (member) => member.id === mongoose.Types.ObjectId(user.id).toString()
  );
  if (!isMember)
    throw ApiError.forbidden("Only chat member can perform this operation");

  await chat.remove();

  res.status(200).json({ message: "Chat deleted successfully" });
};

exports.createMessage = async (req, res) => {
  const { user } = req;
  const { chatId } = req.params;
  const { text } = req.body;

  if (!text) throw ApiError.badRequest("Message must have text");

  const chat = await Chat.findById(chatId);
  if (!chat) throw ApiError.notFound("Chat not found");

  const isMember = chat.members.find(
    (member) => member.id === mongoose.Types.ObjectId(user.id).toString()
  );
  if (!isMember) throw ApiError.forbidden("User is not a chat member");

  const message = {
    sender: {
      _id: user.id,
      name: user.name,
    },
    text,
  };

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { messages: message },
      recentMessage: message,
    },
    { new: true }
  );

  res.status(200).json(updatedChat.recentMessage);
};
