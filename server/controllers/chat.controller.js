import Chat from '../models/chatModel.js';
import user from '../models/userModel.js';

export const accessChats = async (req, res) => {
  const { userId } = req.body;
  if (!userId) res.send({ message: "Provide User's Id" });
  let chatExists = await Chat.find({
    
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.rootUserId } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');
  chatExists = await user.populate(chatExists, {
    path: 'latestMessage.sender',
    select: 'name email profilePic',
  });
  if (chatExists.length > 0) {
    res.status(200).send(chatExists[0]);
  } else {
    let data = {
      chatName: 'sender',
      users: [userId, req.rootUserId],
     
    };
    try {
      const newChat = await Chat.create(data);
      const chat = await Chat.find({ _id: newChat._id }).populate(
        'users',
        '-password'
      );
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
export const fetchAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.rootUserId } },
    })
      .populate('users')
      .populate('latestMessage')
     
      .sort({ updatedAt: -1 });
    const finalChats = await user.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name email profilePic',
    });
    res.status(200).json(finalChats);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};



export const removeContact = async (req, res) => {};
