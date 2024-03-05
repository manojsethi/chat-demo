import common from "../common";
import {
  IAddGroupParticipant,
  IGetGroupDetails,
  IGroupModelDocument,
} from "../interfaces/group/group.interface";
import { ChatModel } from "../model/chat.model";
import { GroupModel } from "../model/groups.model";
import { UserModel } from "../model/user.model";

const createGroup = async (user: any, body: IGroupModelDocument) => {
  let { name, about } = body;
  try {
    let foundUser = await UserModel.findOne({ _id: user._id });
    if (!foundUser) return common.badRequest("User not found!");
    await GroupModel.create({
      createdAt: new Date(),
      createdBy: foundUser._id,
      userDetails: [{ id: foundUser._id, joined_date: new Date() }],
      name,
      about,
    });

    return common.successRequest({ success: true });
  } catch (error) {
    return common.internalServerError();
  }
};
const getMyGroups = async (user: any) => {
  try {
    let foundUser = await UserModel.findOne({ _id: user._id });
    if (!foundUser) return common.internalServerError();

    let foundUserGroups = await GroupModel.find({
      userDetails: {
        $elemMatch: { id: foundUser._id },
      },
    })
      .populate("userDetails.id")
      .lean();
    let updatedGroupsWithUnreadMessages = await Promise.all(
      foundUserGroups.map(async (allGroups) => {
        let countUnreadMessages = await ChatModel.countDocuments({
          chatType: "Group",
          sent_to: allGroups._id,
          sent_from: { $ne: user._id },
          isReadedBy: { $nin: [user._id] },
        });
        return {
          ...allGroups,
          unreadMessages: countUnreadMessages,
        };
      })
    );
    return common.successRequest(updatedGroupsWithUnreadMessages);
  } catch (error) {
    return common.internalServerError();
  }
};
const getGroupDetails = async (user: any, params: IGetGroupDetails) => {
  let { group_id } = params;
  try {
    let findGroup = await GroupModel.findOne({ _id: group_id })
      .populate("userDetails.id")
      .lean();
    let checkUserExistedGroup = findGroup?.userDetails.find(
      (allUsers) => allUsers.id._id.toString() === user._id.toString()
    );
    if (!checkUserExistedGroup)
      return common.badRequest(
        "You are not authorized to access details of this group"
      );

    return common.successRequest(findGroup);
  } catch (error) {
    return common.internalServerError();
  }
};
const addParticipantGroup = async (user: any, body: IAddGroupParticipant) => {
  try {
    let { group_id, participant } = body;
    let findParticpant = await UserModel.findOne({ email: participant });
    if (!findParticpant)
      return common.badRequest("Email does not registered with us");
    let findGroupExists = await GroupModel.findById(group_id);
    if (!findGroupExists) return common.internalServerError();
    let checkAdmin =
      findGroupExists.createdBy.toString() === user._id.toString();
    if (!checkAdmin)
      common.badRequest(
        "You are not authorized to add participant in this group"
      );
    console.log(findGroupExists.userDetails, "detail");
    let checkUserAlreadyExist = findGroupExists?.userDetails.find(
      (x) => x.id.toString() === findParticpant?._id.toString()
    );
    if (checkUserAlreadyExist)
      return common.badRequest("User already existed in group");
    if (!findGroupExists) return common.internalServerError();

    await GroupModel.findByIdAndUpdate(findGroupExists._id, {
      $push: {
        userDetails: {
          $each: [{ id: findParticpant.id, joined_at: new Date() }],
          $position: 0,
        },
      },
    });
    return common.successRequest();
  } catch (error) {
    return common.internalServerError();
  }
};
export default {
  createGroup,
  getMyGroups,
  addParticipantGroup,
  getGroupDetails,
};
