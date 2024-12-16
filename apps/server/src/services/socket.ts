// import { Socket } from "dgram";
import { Server } from "socket.io";
import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const pub = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
})
const sub = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
})

class SocketService {
    public initListners(){
        console.log("Init socket listener....")
        this.io.on("connect", (socket)=>{
            console.log("new socket conneted",socket.id)
          socket.on("event:message", async({message}:{message:string})=>{
            console.log("New Message Recieved",message)
            //send msg in redis
            await pub.publish("MESSAGES", JSON.stringify({message}));
          })
        })
        sub.on("message",(channel, message)=>{
            if(channel=="MESSAGES")
            {
                this.io.emit("message",message);
            }
        })
    }

    private _io: Server;

    constructor(){
        console.log("running socket server")
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*"
            }
        });
        sub.subscribe("MESSAGES")
    }

    get io(){
        return this._io;
    }
}

export default SocketService;

