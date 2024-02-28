import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ISignInUserData } from "../interfaces/response/signInUser.interface";
interface IMessageInfo {
    message: string;
    sentBy: { name: string; id: string };
}

interface ISocketData {
    user: ISignInUserData | null,
    mySocket: any | null
}
interface ISocketContext {
    socket: ISocketData
    setSocket?: (v: ISocketData) => any;


}

export let SocketContext = createContext<ISocketContext>({ socket: { mySocket: null, user: null } });

export const SocketProvider = ({ Child }: any) => {
    let [socket, setSocket] = useState<ISocketData>({
        mySocket: null,
        user: null

    });
    useEffect(() => {
        if (socket.user) setSocket(prev => {
            prev = {
                ...prev, mySocket: io(
                    "http://localhost:9000",
                    {
                        query: {
                            _id: socket.user?._id,
                        },
                    }

                )
            }
            return prev
        })

    }, [socket.user])
    return (
        <SocketContext.Provider
            value={{
                socket,
                setSocket
            }}
        >
            {Child}
        </SocketContext.Provider>
    );
};
