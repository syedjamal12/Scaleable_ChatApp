// import { Socket } from "dgram";
import { Server } from "socket.io";

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

