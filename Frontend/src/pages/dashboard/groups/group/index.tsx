import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { HttpStatusCode } from "axios";
import { useContext, useEffect, useState } from "react";
import Loader from "../../../../components/loader";
import { ChatContext } from "../../../../context/chat.context";
import { SocketContext } from "../../../../context/socket.context";
import ChatServices from "../../../../services/index";
import ChatingArea from "../components/chatingArea";
import ChatInGroup from "./chatInGroup";
import ChattingArea from "../../chats/chattingArea";
import { IMyGroupsData } from "../../../../interfaces/response/groupRespo.interface";

const GroupChat = () => {
  const [groupsList, setGroupsList] = useState<IMyGroupsData[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IMyGroupsData | null>(
    null
  );
  const { messageInfo } = useContext(ChatContext);
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState<boolean>(false);
  const getAllMyGroups = async () => {
    setLoading(true);
    let response = await ChatServices.getMygroups();
    console.log(response,"response")
    if (response.statusCode === HttpStatusCode.Ok)
      setGroupsList(
        response.data.map((x) => {
          return { ...x, isSelected: false };
        })
      );
    setLoading(false);
  };
  const handleSelectGroup = (userData: IMyGroupsData) => {
    setSelectedGroup(userData);
  };
  useEffect(() => {
    getAllMyGroups();
  }, []);

  useEffect(() => {
    if (messageInfo.message) {
      let foundGroupExists = groupsList.find(
        (x) => x._id.toString() === messageInfo.sentBy.id.toString()
      );
      console.log(foundGroupExists,"foundGroupExists")
      setGroupsList((prev) => {
        //pending work
        return [...prev];
      });
    }
  }, [messageInfo]);
  useEffect(() => {
    if (selectedGroup) {
      socket.mySocket.emit("startChat", {
        id: socket.user?._id,
        userId: selectedGroup._id,
      });
      setGroupsList((prev) =>
        prev.map((prevUsers) => {
          if (prevUsers._id === selectedGroup._id)
            prevUsers = { ...prevUsers, unreadMessages: 0 };
          return prevUsers;
        })
      );
    }
  }, [selectedGroup]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : selectedGroup ? (
        selectedGroup && (
          <ChatInGroup
            setSelectedGroup={setSelectedGroup}
            selectedGroup={selectedGroup}
          />
        )
      ) : (
        <ChatingArea
          sideBarChatChild={
            groupsList && (
              <div className="py-3">
                {groupsList?.map((x) => (
                  <div className="px-2 mt-1 ">
                    <div
                      className={`${
                        x.isSelected
                          ? "bg-[#00A038] rounded-2xl  text-white w-full"
                          : ""
                      } dark:text-white px-4`}
                    >
                      <Badge size="small" count={x.unreadMessages}>
                        <div
                          onClick={() => handleSelectGroup(x)}
                          className={`flex cursor-pointer items-center gap-4  p-2 `}
                        >
                          <Avatar
                            size={"large"}
                            src={
                              <UserOutlined
                                className={`${
                                  x.isSelected ? "text-white" : "text-[black]"
                                } dark:text-white`}
                              />
                            }
                          />
                          <div
                            className={`text-lg  ${
                              x.isSelected ? "text-white" : "text-black"
                            } dark:text-white`}
                          >
                            {x.name?.length > 12
                              ? x.name.slice(0, 12) + "..."
                              : x.name}
                          </div>
                        </div>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )
          }
          chatAreaChild={<ChattingArea />}
        />
      )}
    </div>
  );
};

export default GroupChat;
