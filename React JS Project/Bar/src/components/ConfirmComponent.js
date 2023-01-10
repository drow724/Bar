import styles from "./ConfirmComponent.module.css";
import CartComponent from '../components/CartComponent';
import React from "react";
import { useRef } from "react";

function Confirm({ menus }) {

    const ref = useRef();

    setInterval(() => {
        if(ref.current !== null){
            ref.current.scrollTo({top: ref.current.scrollTop+100, left: 0, behavior: "smooth"});
            if (ref.current.offsetHeight + ref.current.scrollTop >= ref.current.scrollHeight) {
                ref.current.scrollTo({top: 0, left: 0, behavior: "smooth"});
            }
        }
    }, 1000);
    
    return (
        <React.Fragment>
            <div className={styles.container}>
                <h1 className={styles.tab__title}>
                    주문 확인
                </h1>
            </div>
            <div className={styles.container}>
                <div ref={ref} className={styles.main} >
                    {menus.filter(m => m.count > 0).map((menu,i) => (
                        <CartComponent key={menu.id} index={i} {...menu} />
                    ))}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.confirm}>
                    <h2 className={styles.tab__title__button}>
                        OK
                    </h2>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Confirm;