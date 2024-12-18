// import { Socket } from "dgram";
import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
    host:"caching-39129b63-mdhasnat294-d59c.f.aivencloud.com",
    port:14574,
    username:"default",
    password:"AVNS_OMHL3khZJo1hfRr4v1B"
})
const sub = new Redis({
    host:"caching-39129b63-mdhasnat294-d59c.f.aivencloud.com",
    port:14574,
    username:"default",
    password:"AVNS_OMHL3khZJo1hfRr4v1B"
})

class SocketService {
    public initListners(){
        console.log("Init socket listener....")
        this.io.on("connect", (socket)=>{
            console.log("new socket conneted",socket.id)
          socket.on("event:message", async({message}:{message:string})=>{
            console.log("New Message Recieved",message)
          })
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
    }

    get io(){
        return this._io;
    }
}

export default SocketService;

