"use client"
import { error } from "node:console";
import { Interface } from "node:readline/promises"
import { json } from "node:stream/consumers";
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io,Socket } from "socket.io-client"

interface SocketProviderProps{
    children?: React.ReactNode;
}
interface ISocketContext {
    sendMessage : (msg : string)=>any
    msgs:string[]
} 

const SocketContext = React.createContext<ISocketContext | null>(null)


export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error("Socket context is undefined");
    return state; // Ensure the hook returns the context value
  };
  

export const SocketProvider:React.FC<SocketProviderProps>=({children})=>{
    const[socket,setSocket]=useState<Socket>()
    const[msgs,setMsgs]=useState<string[]>([])
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) =>{
     console.log("send msg",msg)
     if(socket){
        socket.emit("event:message",{ message : msg});
     }
    },[socket])
    
const onMessageRecieve=useCallback((msg:string)=>{
         console.log("From server msg rcv",msg)
         const {message} = JSON.parse(msg) as {message:string}
         setMsgs((prev)=>[...prev,message])
},[])

useEffect(()=>{
    const _socket = io('http://localhost:8000')
    _socket.on("message",onMessageRecieve)
    setSocket(_socket);
    return()=>{
    _socket.disconnect();
    _socket.off("message",onMessageRecieve)
    setSocket(undefined)
    }
},[])

    return(
        <SocketContext.Provider value={{sendMessage,msgs}}>
            {children}
        </SocketContext.Provider>
    )
}