import { createSocket, Socket } from "dgram";

const UDP_PORT: number = 0xcafe;
const udpsocket: Socket = createSocket("udp4");


udpsocket.on("close", () => {
    console.log("Socket closed.");
});

udpsocket.on("error", (e) => {
    console.log(e.message);
});

udpsocket.on("listening", () => {
  udpsocket.setBroadcast(true);
  console.log(udpsocket.address())
  console.log(`Socket listening for broadcast messages on port ${UDP_PORT}`);
});

udpsocket.on("message", (m) =>{
    try{
        let data = JSON.parse(m.toString());
        switch(data.operation)
        {
            case "NEW":
                break;
            case "UPDATE":
                break;
            case "ALIVE":
                break;
        }
    }
    catch(e){
        console.log("Error on message: "+e+"\n"+m)
    }
});


function sendData(payload, type, mac) {
    type = Buffer.from(type);
    mac = Buffer.from(mac);
    payload = Buffer.from(payload);
    let len = new Buffer(1);
    len.writeInt8(payload.length,0)

    if(type.length>8||mac.length>6*8||len.length>8||payload.length>255*8)
        return Error("Invalid length for arguments")

    console.log("Sending...")
    var message = Buffer.concat([type, mac, len, payload]);
    udpsocket.send(message, 50743, "255.255.255.255", (err) => {
        if (err) return console.log(err);
    });
}

udpsocket.bind(UDP_PORT);

setInterval(()=>{
    sendData("Roba","NEW","SO:NO:IO:LO:GI:UR:OO")
},2000);

export {
    udpsocket,
    sendData
};