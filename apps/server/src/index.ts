import http from "http"
import SocketService from "./services/socket";

async function init() {
    const socketService = new SocketService();
    const server = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT : 8000;
    socketService.io.attach(server)

    server.listen(PORT, ()=>
    console.log(`server running on ${PORT}`)
    )
    socketService.initListners();
}
init();