import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Room2 from './Viewer_Pages/Room2';
import Room1 from './Viewer_Pages/Viewer';
import Host from './Components/Host/host.js';
function App() {
  return (
    <div className="App">
      <div className="title">
        <h2>WebRTC Stream Project</h2>
      </div>
    <BrowserRouter>
      <Routes>
        <Route index element={<Host />}/>
        <Route path="/Viewer/:id" element={<Room1 />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
