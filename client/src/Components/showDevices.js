import "./showDevices.css";
// import { useState } from "react";
const ShowDevices = (props) => {

  // const[id, getId] = useState("hello");
  // if (!navigator.mediaDevices?.enumerateDevices) {
  //   console.log("enumerateDevices() not supported.");
  // }
    const getCamera = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      // console.log(videoDevices);
      const options = document.getElementById("camera");
      let option = [`<option value=-1>Select Camera</option>`];
      let i = 0;
      option[++i] = videoDevices.map((device) => {
        return `<option value="${device.deviceId}">${device.label}</option>`;
      });
      options.innerHTML = option.join("");
    };
    getCamera();
  

  return (
    <div className="deviceList">
      <label style={{ marginRight: "5px" }}>Select Camera</label>
      <select id="camera" onChange={(event)=>props.setId(event.target.value)} ></select>
    </div>
  );
};

export default ShowDevices;
