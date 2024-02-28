import express from "express";
import passport from "passport";
import chatController from "../controllers/chat.controller";
let authenication = passport.authenticate("jwt", { session: false });

const router = express.Router();
router
  .route("/message")
  .post(authenication, chatController.sendMessage)
  .get(authenication, chatController.getChatWithUser);
router.get("/group", authenication, chatController.getGroupChats);
export default router;
