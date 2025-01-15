import Server from "./src/web/Server.js";

function main(){
    let server = new Server(9090);
    server.start();
}

main();