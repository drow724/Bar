import React from "react";
import styles from "./OrderRoute.module.css";
import {useNavigate } from "react-router-dom";
import useCommand from "@jaegeun/use-command";
import audio from '../static/ESM_Perfect_App_Button_5_Organic_Simple_Classic_Game_Click.wav';
import useSound from "use-sound";

function OrderRoute({socket}) {

  const [play] = useSound(audio ,{
    volume: 0.1
  });

  const doEvery = () => {
      play();
  }

  const menuEnter = () => {
    navigate("/main");
  }
  
  const navigate = useNavigate();
  
  //target이 되는 Data와, 유효한 command 입력 시 항상 실행되는 함수, 그리고 탈출 전략
  const {onChange:confirmChange, element: confirmInput} = useCommand(doEvery,null,null,null,null,menuEnter,null);

  socket.on("onmessage", (data) => {

    const e = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        key: data
    });
    if(confirmInput.current) {
      confirmInput.current.dispatchEvent(e);
    }
    
  });

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.main} >
          <h1 className={styles.tab__title}>
            주문이 완료되었습니다.
          </h1>
        </div>
      </div>
      <div className={styles.container}>
          <div className={styles.confirm}>
              <h2 className={styles.tab__title_button}>
                  메인으로 돌아가기
              </h2>
          </div>
      </div>
      <input ref={confirmInput} onKeyDown={confirmChange} style={{opacity:0, width:0, position: "fixed"}}/>
    </React.Fragment>
);
}

export default OrderRoute;