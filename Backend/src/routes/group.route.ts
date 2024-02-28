import express from "express";
import passport from "passport";
import groupController from "../controllers/group.controller";

const router = express.Router();
router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    groupController.createGroup
  )
  .get(
    passport.authenticate("jwt", { session: false }),
    groupController.getGroups
  );
router
  .route("/participant")
  .post(
    passport.authenticate("jwt", { session: false }),
    groupController.addParticipantGroup
  );
router
  .route("/details")
  .get(
    passport.authenticate("jwt", { session: false }),
    groupController.getGroupDetails
  );
export default router;
