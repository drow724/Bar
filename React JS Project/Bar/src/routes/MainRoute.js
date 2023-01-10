import styles from "./MainRoute.module.css";
import Tab from "../components/TabComponent";
import {tabs} from "../datas/tabs-data.js";
import React,{ useState } from "react";
import audio from '../static/ESM_Perfect_App_Button_5_Organic_Simple_Classic_Game_Click.wav';
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
import useCommand from "@jaegeun/use-command";

function MainRoute({socket}) {

    const [play] = useSound(audio ,{
        volume: 0.1
    });
    
    const doEvery = () => {
        play();
    }

    //index 선택 state
    const [selection, setSelection] = useState(1);

    const arrowUp = () => {
        if(selection === 1) {
            setSelection(tabs.length);
        } else {
            setSelection(selection - 1);
        }
    }

    const arrowDown = () => {
        if(selection === tabs.length) {
            setSelection(1);
        } else {
            setSelection(selection + 1);
        }
    }

    const navigate = useNavigate();

    const enter = () => {
        navigate(`/${tabs[selection-1].name}`);
    }

    const {element, onChange, focusOut} = useCommand(doEvery, arrowUp, arrowDown, null, null, enter, null);

    socket.on("onmessage", (data) => {
        const e = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            key: data
        });
        if(element.current) {
            element.current.dispatchEvent(e);
        }
    });
    
    return (
        <div className={styles.tabs}>
            {tabs.map(tab =>  
                <Tab key={tab.id} {...tab} selection={selection} isEnter={enter}/>
            )}
            <input ref={element} onBlur={focusOut} onKeyDown={onChange} style={{opacity:0, width:0, position: "fixed"}}/>
        </div>
    );
}
  
  export default MainRoute;