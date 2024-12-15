"use client"
import { error } from "node:console";
import { Interface } from "node:readline/promises"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io,Socket } from "socket.io-client"

interface SocketProviderProps{
    children?: React.ReactNode;
}
interface ISocketContext {
    sendMessage : (msg : string)=>any
} 

const SocketContext = React.createContext<ISocketContext | null>(null)


export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error("Socket context is undefined");
    return state; // Ensure the hook returns the context value
  };
  

export const SocketProvider:React.FC<SocketProviderProps>=({children})=>{
    const[socket,setSocket]=useState<Socket>()
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) =>{
     console.log("send msg",msg)
     if(socket){
        socket.emit("event:message",{ message : msg});
     }
    },[socket])
    


useEffect(()=>{
    const _socket = io('http://localhost:8000')
    setSocket(_socket);
    return()=>{
    _socket.disconnect();
    setSocket(undefined)
    }
},[])

    return(
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}