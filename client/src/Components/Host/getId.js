import { useState } from "react";
import "./getId.css";
const GetRoomId = (props) => {
  const [RoomId, changeId] = useState("");
  const changeRoomId = (event) => {
    changeId(event.target.value);
  };
  
  const getVideo =(event) => {
    event.preventDefault();
    props.x(RoomId);
    changeId("");
  };

  return (
    <div className="Get">
      <h4 style={{ marginRight: "5px" }}>Enter the Room Id</h4>
      <form onSubmit={getVideo}>
        <input type="text" onChange={changeRoomId} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default GetRoomId;
