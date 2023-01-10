import PropTypes from "prop-types";
import React, { useRef } from "react";
import styles from "./CartComponent.module.css";

function Cart({ id, image, name, count, cartSelection, i, parentFunction }) {
  const ref = useRef();
  if (Number(cartSelection) === i + 1 && typeof ref.current !== "undefined") {
    const bottom = ref.current.getBoundingClientRect().bottom;
    const top = ref.current.getBoundingClientRect().top;
    parentFunction(id, bottom, top);
  }
  return (
    count > 0 && (
      <div ref={ref} className={styles.leaderboard__profiles}>
        <article
          className={
            Number(cartSelection) === i + 1
              ? styles.leaderboard__profile__select
              : styles.leaderboard__profile
          }
        >
          <img src={image} alt={name} className={styles.leaderboard__picture} />
          <span className={styles.leaderboard__name}>{name}</span>
          <span className={styles.leaderboard__value}>{count}</span>
        </article>
      </div>
    )
  );
}

Cart.prototype = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  cartSelection: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Cart;
