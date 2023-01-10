import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StockRoute.module.css";

function StockRoute({ socket }) {
  window.location.href = "http://129.154.202.77/barAdmin/";

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.main}>
          <h1 className={styles.tab__title}>페이지 이동중...</h1>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StockRoute;
