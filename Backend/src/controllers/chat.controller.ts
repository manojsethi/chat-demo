import { Request, Response } from "express";
import chatService from "../services/chat.service";
import common from "../common";
const sendMessage = async (req: Request, res: Response) => {
  let result = await chatService.sendMessage(req.user, req.body);
  return res.status(result?.statusCode ?? 400).send(result);
};
const getChatWithUser = async (req: Request, res: Response) => {
  let result = await chatService.getChatWithUser(req.user, req.query);
  return res.status(result?.statusCode ?? 400).send(result);
};
const getGroupChats = async (req: Request, res: Response) => {
  let result = await chatService.getGroupChats(req.user, req.query);
  return res.status(result?.statusCode ?? 400).send(result);
};

const uploadMedia = async (req: any, res: Response) => {
  // let file = req.files?.file;
  let uploadedFile = req.files?.file; // file && Array.isArray(file) ? file?.[0] : file;
  if (uploadedFile) {
    let result = await chatService.uploadMediaService(uploadedFile);
    return res.status(result?.statusCode ?? 400).send(result);
  } else
    return res
      .status(400)
      .send(common.badRequest("file is required to upload!"));
};
export default { sendMessage, getChatWithUser, getGroupChats, uploadMedia };
