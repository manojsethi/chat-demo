import mongoose from "mongoose";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { io } from "..";
import common from "../common";
import { senderSocket } from "../config/io.config";
import { IChatModelDocument } from "../interfaces/chat/chat.interface";
import { ChatModel } from "../model/chat.model";
import { GroupModel } from "../model/groups.model";
import { RoomModel } from "../model/room.model";
import { SocketModel } from "../model/socket.model";
import { UserModel } from "../model/user.model";
import { UploadedFile } from "express-fileupload";

const sendMessage = async (user: any, body: IChatModelDocument) => {
  let { message, sent_to, chatType } = body;

  try {
    if (chatType === "Group") {
      let myDetail = await UserModel.findById(user._id).lean();
      let userExistedGroup = await GroupModel.findById(sent_to);
      if (!userExistedGroup)
        return common.badRequest(
          "You are not authoirized to send message in this group"
        );
      await ChatModel.create({
        message: message,
        sent_from: user._id,
        sent_to: userExistedGroup._id,
        chatType: "Group",
      });
      senderSocket.to(userExistedGroup._id.toString())
        .emit("groupMessage", { sent_from: myDetail, message });

      return common.successRequest({ success: true });
    }
    let findUser = await UserModel.findById(
      new mongoose.Types.ObjectId(sent_to)
    ).lean();

    if (!findUser)
      return common.badRequest(
        "This user does not exist or deleted their account"
      );

    await ChatModel.create({
      message: message,
      sent_from: user._id,
      sent_to: findUser._id,
    });
    let findSocketUser = await SocketModel.findOne({ user_id: findUser._id });
    io.sockets.sockets.forEach((onlineSockets) => {
      findSocketUser?.socket_id.forEach((allSocketsUser) => {
        if (allSocketsUser.toString() === onlineSockets.id.toString()) {
          onlineSockets.emit("chatMessage", {
            message: message,
            id: user._id,
          });
        }
      });
    });
    return common.successRequest({ success: true });
  } catch (error) {
    return common.internalServerError();
  }
};
const sendMessageSocketService = async (
  user: any,
  _socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  body: any
) => {
  let { message, sent_to, chatType, message_type, file_url } = body;
  try {
    if (chatType === "Group") {
      let myDetail = await UserModel.findById(user._id).lean();
      let userExistedGroup = await GroupModel.findById(sent_to);
      if (!userExistedGroup)
        return common.badRequest(
          "You are not authoirized to send message in this group"
        );
      await ChatModel.create({
        message: message,
        message_type,
        file_url,
        sent_from: user._id,
        sent_to: userExistedGroup._id,
        chatType: "Group",
      });
      _socket.to(userExistedGroup._id.toString()).emit("groupMessage", {
        sent_from: myDetail,
        message,
        message_type,
        sent_to: userExistedGroup._id,
        file_url,
        group_name:userExistedGroup.name
      });

      return common.successRequest({ success: true });
    } 
    else {
      let findUser = await UserModel.findById(
        new mongoose.Types.ObjectId(sent_to)
      ).lean();
      if (!findUser)
        return common.badRequest(
          "This user does not exist or deleted their account"
        );

      await ChatModel.create({
        message: message,
        message_type,
        file_url,
        sent_from: user._id,
        sent_to: findUser._id,
      });
      let foundUserRoom = await RoomModel.findOne({
        users: { $all: [findUser._id, user._id] },
      }).lean();
      if (foundUserRoom)
        _socket.to(foundUserRoom._id.toString()).emit("chatMessage", {
          sent_from: user,
          message,
          message_type,
          sent_to: foundUserRoom._id,
          file_url,
        });
      return common.successRequest({ success: true });
    }
  } catch (error) {
    return common.internalServerError();
  }
};
const getChatWithUser = async (user: any, body: any) => {
  let { chatUserId } = body;
  let foundUserRoom = await RoomModel.findOne(
    {
      users: {
        $all: [
          new mongoose.Types.ObjectId(chatUserId),
          new mongoose.Types.ObjectId(user._id),
        ],
      },
    },
    { upsert: true }
  );
  if (!foundUserRoom)
    await RoomModel.create({
      chatType: "personal",
      users: [chatUserId, user._id],
    });
  let findChat = await ChatModel.find({
    $or: [
      {
        sent_from: chatUserId,
        sent_to: user._id,
      },
      {
        sent_from: user._id,
        sent_to: chatUserId,
      },
    ],
  }).lean();
  findChat.forEach(
    async (chats) =>
      await ChatModel.findByIdAndUpdate(chats._id, {
        $addToSet: { isReadedBy: [user._id] },
      })
  );
  return common.successRequest(findChat);
};
const getGroupChats = async (user: any, params: any) => {
  const { groupId } = params;
  try {
    let groupExists = await GroupModel.findById(groupId);
    if (!groupExists) return common.badRequest("Group not exists");

    let groupChats = await ChatModel.find({
      sent_to: groupExists._id,
      chatType: "Group",
    }).populate("sent_from");
    groupChats.forEach(
      async (allgroups) =>
        await ChatModel.findByIdAndUpdate(allgroups._id, {
          $addToSet: {
            isReadedBy: [user._id],
          },
        })
    );
    return common.successRequest(groupChats);
  } catch (error) {
    return common.internalServerError();
  }
};
const uploadMediaService = async (file: UploadedFile) => {
  try {
    let uploadedRespnse = await common.uploadImage({
      buffer: file.data,
      fieldname: file.name,
      mimetype: file.mimetype,
      originalname: file.name,
      size: file.size,
    });

    return common.successRequest({
      uploadedFileUrl: uploadedRespnse,
    });
  } catch (error) {
    return common.internalServerError();
  }
};
export default {
  sendMessage,
  getChatWithUser,
  getGroupChats,
  sendMessageSocketService,
  uploadMediaService,
};
