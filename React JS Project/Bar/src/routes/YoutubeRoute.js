import { useState, useEffect, useRef } from "react";
import List from "../components/ListComponent";
import styles from "./YoutubeRoute.module.css";
import { useNavigate } from "react-router-dom";
import useCommand from "@jaegeun/use-command";
import styled, { keyframes, css } from 'styled-components';
import YouTube from 'react-youtube';
import audio from '../static/ESM_Perfect_App_Button_5_Organic_Simple_Classic_Game_Click.wav';
import useSound from "use-sound";

const Box = styled.div`
    @media screen and (max-width: 1090px) {
      .menus {
        grid-template-columns: 1fr;
        width: 100%;
      }
    }
    display: grid;
    grid-gap: 100px;
    padding: 50px;
    width: 80%;
    padding-top: 70px;
    animation: ${(props) =>  css`${props.animation} 0.5s forwards;`}
    ${(props) => props.direction === "" && `
      transform: translate(${0}px, ${560-(props.selection*240)}px)
    `}
  `;

function YoutubeRoute({socket}) {

    const [play] = useSound(audio ,{
      volume: 0.1
    });

    const doEvery = () => {
        play();
    }

    const [player, setPlayer] = useState();
    //API통신 완료 여부
    const [loading, setLoading] = useState(true);
    //list context index
    const [listDirection, setListDirection] = useState("");
    //API 통신을 통해 가져온 재생목록
    const [playList, setPlayList] = useState([]);

    const getPlayList = async () => {
        const json = await (
            await fetch(
                "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLetnxQf_G6lfjMgwe-hM4SnV2DGAlbSul&key=AIzaSyD2VHt16iQtix8Tv2q17SPpEpNvztjrvso&maxResults=50"
            )
        ).json();
        setPlayList(json.items);   
    }

    useEffect(() => {
      getPlayList();
      setLoading(false);
    },[]);

    //index 선택 state
    const [playListSelection, setPlayListSelection] = useState(1);

    const menuArrowUp = () => {
    if(playListSelection === 1) {
        setPlayListSelection(playList.length);
        setListDirection("down");
    } else {
        setPlayListSelection(playListSelection - 1);
        setListDirection("up");
    }
    }

    const menuArrowDown = () => {
      if(playListSelection === playList.length) {
        setPlayListSelection(1);
        setListDirection("up");
      } else {
        setPlayListSelection(playListSelection + 1);
        setListDirection("down");
      }
    }

    const menuEnter = () => {
      setListDirection("");
      if(player.getPlayerState() === 1){
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }

    const navigate = useNavigate();

    const playListEscape = () => {
      navigate('/main')
    }

    //target이 되는 Data와, 유효한 command 입력 시 항상 실행되는 함수, 그리고 탈출 전략
    const {onChange:listChange, element: listInput} = useCommand(doEvery,menuArrowUp,menuArrowDown,null,null,menuEnter,playListEscape);

    const animation = keyframes`
      ${listDirection === "up" && `
          from {
          transform: translate(${0}px, ${560-((playListSelection+1)*240)}px)
          }
          to {
          transform: translate(${0}px, ${560-(playListSelection*240)}px)
          }
      `}
      ${listDirection === "down" && `
          from {
          transform: translate(${0}px, ${560-((playListSelection-1)*240)}px)
          }
          to {
          transform: translate(${0}px, ${560-(playListSelection*240)}px)
          }
      `}
    `;

  const ref = useRef();

  useEffect(() => {
    socket.on("onmessage", (data) => {

      if(data === "VolumeUp") {
        player.setVolume(player.getVolume()+5);
      } else if(data === "VolumeDown") {
        player.setVolume(player.getVolume()-5);
      } else if(data === "Mute") {
        if(player.isMuted()) {
          return player.unMute()
        } else {
          return player.mute();
        }
      } else {
        const e = new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: data
        });
        if(listInput.current) {
          listInput.current.dispatchEvent(e);
        }
      }
    });
  },[]);

  return (
      <div className={styles.container}>

      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <Box direction={listDirection} animation={animation} selection={playListSelection}>
          {playList.map((list,i) => (
            <List
              key={list.id}
              {...list}
              isSelected={playListSelection-1 === i}
            />
          ))}
        </Box>
      )}
      <div className={styles.main} >
        {playList.filter((p,i) => playListSelection-1 === i).map((play,i) => (
          <YouTube ref={ref}
          key={play.snippet.title}
          videoId={play.snippet.resourceId.videoId}                  // defaults -> null
          // title={string}                    // defaults -> null
          opts={{
            width: "870",
            height: "510",
            playerVars: {
              autoplay: 1, //자동재생 O
              vq: 'large'
            },
          }}
          onReady={(event) =>{
            setPlayer(event.target.setVolume(50));
          }}
          onPlay={(event) =>{
          }}
          // onPause={func}                    // defaults -> noop
          onEnd={(event) => {
            event.target.playVideo();
          }}                      // defaults -> noop
          // onError={func}                    // defaults -> noop
          // onStateChange={func}              // defaults -> noop
          // onPlaybackRateChange={func}       // defaults -> noop
          // onPlaybackQualityChange={func}    // defaults -> noop
        />
        ))}
      </div>
      <input ref={listInput} onKeyDown={listChange} style={{opacity:0, width:0, position: "fixed"}}/>
    </div>
);
}

export default YoutubeRoute;