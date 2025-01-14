import Server from "./src/presentation/Server.js";

function main(){
    let server = new Server(9090);
    server.start();
}

main();