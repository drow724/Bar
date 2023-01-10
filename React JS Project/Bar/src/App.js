import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './routes/MainRoute';
import Menu from './routes/MenuRoute';
import Controll from './routes/ControllRoute';
import Youtube from './routes/YoutubeRoute';
import Order from './routes/OrderRoute';
import Stock from './routes/StockRoute';
import './App.css';
import { v4 } from 'uuid';
import io from 'socket.io-client';
import { useEffect, useState } from "react";

function App() {

  const uuid = v4();

  let socket = io(`http://146.56.38.5:4000/?uuid=${uuid}`, { transports: ["websocket"] });
  
  socket.on('connect', () => {
    socket =  io.connect(`http://146.56.38.5:4000/?uuid=${uuid}`);
  });

  socket.on('disconnect', () => {
    socket =  io.connect(`http://146.56.38.5:4000/?uuid=${uuid}`);
  });

  return (
    <Router basename={process.env.PUBLIC_URL}>
          <Routes >
            <Route path="/admin" element={<Stock socket={socket} />} />
            <Route path="/youtube" element={<Youtube socket={socket} />} />
            <Route path="/menu" element={<Menu socket={socket}/>}  />
            <Route path="/main" element={<Main socket={socket}/>} />
            <Route path="/order" element={<Order socket={socket}/>} />
            <Route path="/" element={<Controll socket={socket} uuid={uuid}/>} />
          </Routes>
    </Router>
  );
}

export default App;
