import PropTypes from "prop-types";
import React, { useRef } from "react";
import styles from "./StockComponent.module.css";

function Stock({ PRDLST_NM, count }) {
  const ref = useRef();

  return (
    <div ref={ref} className={styles.leaderboard__profiles} >
        <article className={styles.leaderboard__profile}>
          <span className={styles.leaderboard__name} >{PRDLST_NM}</span>
          <span className={styles.leaderboard__value} >{count}</span>
        </article>
    </div>
  );  
}

Stock.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  cartSelection: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default Stock;