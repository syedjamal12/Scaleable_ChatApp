"use client"

import { useState } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Page(){
const {sendMessage,msgs} = useSocket();
const[message,setMessage]=useState('')

  return(
    <div>
      
      <div>
        <input placeholder="message" onChange={(e) => setMessage(e.target.value)}></input>
        <button onClick={(e) => sendMessage(message)}>send</button>
      </div>
      {
        msgs.map((e)=>(
          <li>{e}</li>
        ))
      }
    </div>
  )
}