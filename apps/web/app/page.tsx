"use client"

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Page(){
const {sendMessage} = useSocket();
const[message,setMessage]=useState('')

  return(
    <div>
      <div>
        <h1>All Messages Appear here</h1>
      </div>
      <div>
        <input placeholder="message" onChange={(e) => setMessage(e.target.value)}></input>
        <button onClick={(e) => sendMessage(message)}>send</button>
      </div>
    </div>
  )
}