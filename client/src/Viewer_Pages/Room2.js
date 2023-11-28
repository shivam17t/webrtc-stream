// import io from "socket.io-client";
// import { useRef, useEffect } from "react";
// const Room2 = () => {
//   const peer = useRef();
//   const socket = useRef();
//   useEffect(() => {
//     socket.current = io.connect("http://localhost:3001");
//     const video2 = document.getElementById("video2");

//     socket.current.on("offer", async (id, data) => {
//       peer.current = new RTCPeerConnection({
//         iceServers: [
//           {
//             urls: "stun:stun.l.google.com:19302",
//           },
//           {
//             'urls': 'turn:192.158.29.39:3478?transport=udp',
//             'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
//             'username': '28224511:1379330808'
//           },
//         ],
//       });
//       peer.current.ontrack = (e) => {
//         console.log(e.streams[0]);
//         handleTrack(e);
//       };

//       const desc = new RTCSessionDescription(data.sdp);
//       await peer.current
//         .setRemoteDescription(desc)
//         .catch((e) => console.log(e));
//       const ans = await peer.current.createAnswer();
//       await peer.current.setLocalDescription(ans).catch((e) => console.log(e));
//       const ansData = {
//         sdp: peer.current.localDescription,
//       };
//       socket.current.emit("answer", id, ansData);
//       peer.current.onicecandidate = (event) => {
//         console.log('hi',event.candidate);
//         if (event.candidate) {
//           socket.current.emit("candidateh", id, event.candidate);
//         }
//       };

//       peer.current.addTransceiver("video", { direction: "recvonly" });

//       console.log(peer.current);
//     });

//     socket.current.on("candidatev", (id, candidate) => {
//       // console.log(candidate);
//       if (candidate) {
//         peer.current
//           .addIceCandidate(new RTCIceCandidate(candidate))
//           .catch((e) => console.error(e));
//       }
//     });
//     const handleTrack = (e) => {
//       if (e.streams[0]) 
//       video2.srcObject = e.streams[0];
//     };
//     socket.current.on("connect", () => {
//       socket.current.emit("viewer", 2);
//     });
//     // socket.current.on("broadcast", () => {
//     //   socket.current.emit("viewer");
//     // });
//   },[]);

//   window.onunload = window.onbeforeunload = () => {
//     socket.current.close();
//     peer.current.close();
//   };

//     console.log("It's the Room2");
//   //   console.log(peer);
//   // console.log(document.getElementById("Video").srcObject);
//   // console.log(stream.current);
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <h1>Room-2</h1>
//       <br />
//       <video id="video2" controls></video>
//     </div>
//   );
// };
// export default Room2;
