import path from "path";
import common from "../common";
import { ChatModel } from "../model/chat.model";
import { UserModel } from "../model/user.model";
const getUsers = async (user: any) => {
  try {
    let users = await UserModel.find({ _id: { $ne: user._id } }).lean();
    let updatedUsers: any[] = [];
    await Promise.all(
      users.map(async (x) => {
        let unreadMessagesCount = await ChatModel.countDocuments({
          sent_to: user._id,
          isReadedBy: {
            $nin: [user._id],
          },
          sent_from: x._id,
        });
        updatedUsers.push({
          ...x,
          profile:
            x.profile && `${process.env.CHAT_MANOJ_DEMO_BASE_URL}${x?.profile}`,
          unReadedMessages: unreadMessagesCount,
        });
      })
    );
    if (updatedUsers && updatedUsers.length > 0)
      return common.successRequest(updatedUsers);
  } catch (error) {
    return common.internalServerError();
  }
};
const updateUserProfile = async (
  user: any,
  data: { userName: string },
  file?: any
) => {
  try {
    let { userName } = data;
    let modifiedUserName = new RegExp(userName, "i");
    let nameAlreadyExists = await UserModel.findOne({
      name: modifiedUserName,
      _id: { $ne: user._id },
    });
    if (nameAlreadyExists) return common.badRequest("Name already exists ");
    let imageName: any = null;
    if (file) {
      imageName = new Date().getTime().toString() + file.name;
      const destinationDirectory = path.join(__dirname, "../../src/upload/");
      const destinationFilePath = path.join(destinationDirectory, imageName);

      try {
        file.mv(destinationFilePath);
      } catch (error) {
        return common.internalServerError();
      }
    }

    let obj: any = { name: userName };
    if (imageName && file) obj = { ...obj, profile: imageName };
    let updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        $set: obj,
      },
      { new: true }
    );
    let modifiedUser: any = {
      ...updatedUser?.toObject(),
      profile: `${process.env.CHAT_MANOJ_DEMO_BASE_URL}${updatedUser?.profile}`,
    };
    delete modifiedUser?.password;

    return common.successRequest(modifiedUser);
  } catch (error) {
    return common.internalServerError();
  }
};
export default { getUsers, updateUserProfile };
