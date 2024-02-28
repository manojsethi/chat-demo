import { Request, Response } from "express";
import chatService from "../services/chat.service";
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
export default { sendMessage, getChatWithUser, getGroupChats };
