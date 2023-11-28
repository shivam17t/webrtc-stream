import {io} from "socket.io-client";
import { useRef, useEffect } from "react";
import {useParams} from 'react-router-dom'
const Room1 = () => {
  const peer = useRef();
  const socket = useRef();
  const RoomNo = useRef({});
  RoomNo.current = useParams();

  useEffect(() => {
    socket.current = io.connect("http://localhost:3001");
    const video1 = document.getElementById("video1");
    socket.current.on("offer", async (id, data) => {
      peer.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            'urls': 'turn:192.158.29.39:3478?transport=udp',
            'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            'username': '28224511:1379330808'
          },
        ],
      });
      peer.current.ontrack = (e) => {
        console.log(e.streams[0]);
        handleTrack(e);
      };

      const desc = new RTCSessionDescription(data.sdp);
      await peer.current
        .setRemoteDescription(desc)
        .catch((e) => console.log(e));
      const ans = await peer.current.createAnswer();
      await peer.current.setLocalDescription(ans).catch((e) => console.log(e));
      const ansData = {
        sdp: peer.current.localDescription,
      };
      socket.current.emit("answer", id, ansData);
      peer.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.current.emit("candidateh", id, event.candidate);
        }
      };

      peer.current.addTransceiver("video", { direction: "recvonly" });

      console.log(peer.current);
    });

    socket.current.on("candidatev", (id, candidate) => {
      // console.log(candidate);
      if (candidate) {
        peer.current
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.error(e));
      }
    });
    const handleTrack = (e) => {
      if (e.streams[0]) 
      video1.srcObject = e.streams[0];
    };

    socket.current.on('Nobroadcast', ()=>{
      alert("No Broadcast Available on this Room Id");
    });

    socket.current.on('connect', ()=>{
      console.log("Connection trigered");
      console.log(RoomNo.current);
      socket.current.emit("viewer", RoomNo.current.id);
    });

  },[]);

  window.onbeforeunload = () => {
    socket.current.emit('deleteConnection');
    socket.current.close();
  };
 
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Viewer Page</h1>
      <br />
      <video id="video1" autoPlay playsInline controls></video>
    </div>
  );
};
export default Room1;
