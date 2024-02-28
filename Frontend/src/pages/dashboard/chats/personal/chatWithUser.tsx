import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input } from "antd";
import { HttpStatusCode } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader";
import { ChatContext } from "../../../../context/chat.context";
import { SocketContext } from "../../../../context/socket.context";
import { IChatData } from "../../../../interfaces/response/chats.interface";
import { IUsersData } from "../../../../interfaces/response/users.Respo.interafce";
import ChatServices from "../../../../services/index";


const ChatWithUser = ({ selectedUser, setSelectedUser }: { selectedUser: IUsersData, setSelectedUser: (value: any) => any }) => {
    const navigate = useNavigate()
    let loggedInUser = localStorage.getItem("loggedInUser")
        ? JSON.parse(localStorage.getItem("loggedInUser")!)
        : null;
    const [myChats, setMyChats] = useState<IChatData[]>([]);
    const { socket } = useContext(SocketContext)
    const { messageInfo } = useContext(ChatContext);
    const [message, setMessage] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);
    const getChatsWithUser = async (userId: string) => {
        setLoader(true);
        let response = await ChatServices.getChats(userId);
        if (response.statusCode === HttpStatusCode.Ok) setMyChats(response.data);
        setLoader(false);
    };


    const messageHandler = (id: string, message: string) => {
        setMessage("");
        setMyChats((prev) => [
            ...prev,
            {
                message: message,
                sent_from: loggedInUser._id,
                __v: 0,
                date: new Date().toString(),
                _id: Math.random().toString(),
                isReaded: false,
                sent_to: id,
                chatType: "Personal",
            },
        ]);
        socket.mySocket.emit("personalMessage", {
            message,
            sent_to: id,
            chatType: "Personal",
        });
    };
    useEffect(() => {
        if (selectedUser) getChatsWithUser(selectedUser._id);
    }, [selectedUser]);
    useEffect(() => {
        if (
            messageInfo.message &&
            messageInfo.sentBy.id.toString() === selectedUser._id
        )
            setMyChats((prev) => [
                ...prev,
                {
                    message: messageInfo.message,
                    sent_from: messageInfo.sentBy.id,
                    __v: 0,
                    date: new Date().toString(),
                    _id: Math.random().toString(),
                    isReaded: true,
                    sent_to: loggedInUser._id,
                    chatType: "Personal",
                },
            ]);
    }, [messageInfo.message]);
    return (
        <>
            <div className="">
                <div className="bg-[#00A038] rounded-xl py-4">
                    <div className="flex justify-between px-6">
                        <div className="text-white flex gap-4 items-center">
                            <Avatar
                                size={"large"}
                                src={selectedUser?.profile ?? <UserOutlined />}
                            />

                            <p className="font-semibold">{selectedUser.name}</p>
                        </div>
                        <div>
                            <Button onClick={() => setSelectedUser(null)} type="primary" className="text-white mt-2 text-base font-medium" >Go Back</Button>
                        </div>
                    </div>
                </div>
                <div>
                    {loader ? (
                        <Loader />
                    ) : (
                        <div className="shadow-3xl dark:shadow bg-white  mt-6   dark: dark:bg-navy-900 overflow-y-auto overflow-x-hidden ">
                            <div className="flex justify-center mt-2 py-4">
                                <p className="text-center text-white bg-[#00A038] px-10 rounded-2xl  ">
                                    Today
                                </p>
                            </div>
                            <div className="overflow-y-auto" style={{ minHeight: "49vh" }}>
                                {myChats && myChats.length > 0 ? (
                                    myChats.map((x) => {
                                        if (x.sent_from.toString() === loggedInUser._id.toString())
                                            return (
                                                <div className="flex mb-3 px-3 ">
                                                    <div className="bg-[#00A038] px-6 rounded-xl text-white">
                                                        {x.message}
                                                    </div>
                                                </div>
                                            );
                                        else
                                            return (
                                                <div className="flex justify-between px-3 mb-3 ">
                                                    <div></div>
                                                    <div className="text-black shadow-3xl px-6 rounded-xl">
                                                        {x.message}
                                                    </div>
                                                </div>
                                            );
                                    })
                                ) : (
                                    <div className="text-center mt-10 text-xl  dark:text-white font-medium pb-4">
                                        <p>No Chats Found</p>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type here . . . . ."
                        suffix={
                            <FiSend
                                onClick={() =>
                                    message && messageHandler(selectedUser._id, message)
                                }
                                className="cursor-pointer"
                            />
                        }
                        size="large"
                        className="rounded-none w-full"
                    />
                </div>
            </div>


        </>
    );
};

export default ChatWithUser;
