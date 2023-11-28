import { io } from "socket.io-client";
import "./host.css";
// import axios from "axios";
import { useState, useRef, useEffect } from "react";
import ShowDevices from "../showDevices";
import GetRoomId from "./getId";

const Host = () => {
  const [CamId, setCamId] = useState("");
  const [RoomId, setRoomId] = useState("");
  const socket = useRef();
  const room = useRef({});

  useEffect(() => {
    socket.current = io.connect("http://192.168.178.207:3001");
    let peer = {};
    socket.current.on("viewer", async (id, RID) => {
      // console.log(RID, room.current);
      peer[id] = new RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302",
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808",
          },
        ],
      });
      if (room.current[RID]) {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          room.current[RID]
        );
        mediaStream.getTracks().forEach((track) => {
          // console.log(track);
          peer[id].addTrack(track, mediaStream);
        });

        const offer = await peer[id].createOffer();
        await peer[id].setLocalDescription(offer);
        const offerData = {
          sdp: peer[id].localDescription,
        };
        socket.current.emit("offer", id, offerData);

        peer[id].onicecandidate = (event) => {
          if (event.candidate) {
            socket.current.emit("candidatev", id, event.candidate);
          }
        };
      } else {
        socket.current.emit("noBroadcast", id);
        delete peer[id];
      }
    });
    socket.current.on("answer", async (id, data) => {
      const desc = new RTCSessionDescription(data.sdp);
      await peer[id].setRemoteDescription(desc).catch((e) => console.log(e));
      console.log(peer);
    });

    socket.current.on("candidateh", (id, candidate) => {
      // console.log(candidate);
      if (candidate) {
        peer[id].addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.current.on("deleteConnection", (id) => {
      delete peer[id];
      console.log(`After disconnecting ${id}`, peer);
    });
  }, []);

  window.onunload = window.onbeforeunload = () => {
    socket.current.close();
  };
  const sendStream = () => {
    socket.current.emit("broadcast");
    const link = `http://localhost:3000/Viewer/${RoomId}`;
    document.getElementById(
      "url"
    ).innerHTML = `<a href= ${link} target="blank">${link}</a>`;
  };
  const getCamId = (Id) => {
    setCamId(Id);
  };
  const getRoomId = async (Id) => {
    const constraints = {
      audio: false,
      video: {
        width: 360,
        height: 360,
        deviceId: {
          exact: CamId,
        },
      },
    };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const video = document.getElementById("localVideo");
    video.srcObject = mediaStream;
    setRoomId(Id);
    room.current[Id] = constraints;
    // console.log(room.current);
  };

  return (
    <div className="getDevices">
      <ShowDevices setId={getCamId} />
      <GetRoomId x={getRoomId} />
      <div className="videos">
        <video id="localVideo" autoPlay playsInline></video>
        <h4>Local Cam</h4>
        <button type="button" onClick={sendStream}>
          Start Hosting
        </button>
      </div>
      <div id="url"></div>
    </div>
  );
};

export default Host;
