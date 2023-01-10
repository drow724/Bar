import React, { useEffect } from "react";
import io from 'socket.io-client';

function RemoteRoute() {

    const params = new URLSearchParams(window.location.search);

    let uuid = params.get("uuid");

    let socket =  io.connect(`http://146.56.38.5:4000/?uuid=${uuid}`);

    document.body.style.cursor = "auto";
    
    socket.emit("send","onLoad");

    socket.on("disconnect", () => {
        socket =  io.connect(`http://146.56.38.5:4000/?uuid=${uuid}`);
    });

    socket.on("error", () => {
        socket =  io.connect(`http://146.56.38.5:4000/?uuid=${uuid}`);
    });

    const arrowUpClick = () => {
        socket.emit("send",'ArrowUp');
    }

    const arrowDownClick = () => {
        socket.emit("send",'ArrowDown');
    }

    const arrowLeftClick = () => {
        socket.emit("send",'ArrowLeft');
    }

    const arrowRightClick = () => {
        socket.emit("send",'ArrowRight');
    }

    const arrowEnterClick = () => {
        socket.emit("send",'Enter');
    }

    const arrowEscapeClick = () => {
        socket.emit("send",'Escape');
    }

    const volumeUpClick = () => {
        socket.emit("send",'VolumeUp');
    }

    const volumeDownClick = () => {
        socket.emit("send",'VolumeDown');
    }

    const channelUpClick = () => {
        socket.emit("send",'ChannelUp');
    }

    const channelDownClick = () => {
        socket.emit("send",'ChannelDown');
    }

    const muteClick = () => {
        socket.emit("send",'mute');
    }
    
    return ( 
        <div className="wrapper">
            <div className="container">
                <div className="d-flex flex-row justify-content-between px-3 py-4 align-items-center">
                </div>
                <div className="d-flex flex-row mt-4 justify-content-between px-2">
                    <div className="d-flex flex-column rounded-bg py-3 px-4 justify-content-center align-items-center">
                        <nav onClick={channelUpClick} className="click_channel_up">
                            <i className="fas fa-chevron-up py-3 control-icon"></i>
                        </nav>
                        <span className="label py-3">Channel</span>
                        <nav onClick={channelDownClick} className="click_channel_down">
                            <i className="fas fa-chevron-down py-3 control-icon"></i>
                        </nav>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div onClick={arrowEscapeClick}  className="home d-flex flex-row grey-bg justify-content-center align-items-center">
                            <i className="fas fa-home p-3 home-icon"></i>
                        </div>
                        <span  className="label">Home</span>
                    </div>
                    <div className="d-flex flex-column rounded-bg py-3 px-4 justify-content-center align-items-center">
                        <nav onClick={volumeUpClick} className="click_volume_up">
                            <i className="fas fa-plus py-3 control-icon"></i>
                        </nav>
                        <span className="label py-3">Volume</span>
                        <nav onClick={volumeDownClick} className="click_volume_down">
                            <i className="fas fa-minus py-3 control-icon"></i>
                        </nav>
                    </div>
                </div>
                <div className="mt-5 pt-4 position-relative d-flex flex-row justify-content-center align-items-center">
                    <div onClick={arrowEnterClick} style={{zIndex: 9}} className="circle ok-inner position-absolute">
                        <span >OK</span>
                    </div>
                    <div className="circle ok-outer position-absolute"></div>
                    <nav onClick={arrowRightClick} className="click_right">
                        <i className="fas fa-caret-right position-absolute control-icon"></i>
                    </nav>
                    <nav onClick={arrowDownClick} className="click_down">
                        <i className="fas fa-caret-right position-absolute control-icon rotate_bottom"></i>
                    </nav>
                    <nav onClick={arrowLeftClick} className="click_left">
                        <i className="fas fa-caret-right position-absolute control-icon rotate_left"></i>
                    </nav>
                    <nav onClick={arrowUpClick} className="click_up">
                        <i className="fas fa-caret-right position-absolute control-icon rotate_top"></i>
                    </nav>
                </div>
                <div onClick={muteClick} className="d-flex flex-row justify-content-between mt-5 pt-4 px-3">
                    <div className="d-flex flex-row grey-bg mute">
                        <i className="fas fa-volume-mute p-3 control-icon "></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
  export default RemoteRoute;