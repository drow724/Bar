import styles from "./ControllRoute.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

function ControllRoute({ socket, uuid }) {
  const [qr, setQr] = useState("");

  const getQr = async () => {
    const json = await (
      await fetch("http://146.56.38.5:4000/qr/" + uuid)
    ).json();
    setQr(json.result);
  };

  useEffect(() => {
    getQr();
  }, []);

  const navigate = useNavigate();

  socket.on("onmessage", (data) => {
    if (data === "onLoad") {
      navigate(`/main/?uuid=${uuid}`);
    }
  });

  return (
    <React.Fragment>
      {isMobile ? (
        <React.Fragment>
          <div className={styles.main}>
            <h1 className={styles.tab__title}>
              모바일은 <br /> 지원하지 않습니다.
            </h1>
          </div>
        </React.Fragment>
      ) : (
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <img src={qr} alt="qr" style={{ width: 400 }} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default ControllRoute;
