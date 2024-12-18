// import { Socket } from "dgram";
import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
   
})
const sub = new Redis({
   
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