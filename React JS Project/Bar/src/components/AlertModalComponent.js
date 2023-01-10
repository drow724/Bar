import PropTypes from "prop-types";
import styles from "./AlertModalComponent.module.css";

function Modal({ open, close, header, contents }) {
    
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
          {open ? (
            <section>
              <header>
                {header}
                <button className={styles.close} onClick={close}>
                  &times;
                </button>
              </header>
              <main>{contents}</main>
              <footer>
                <button className="close" onClick={close}>
                  close
                </button>
              </footer>
            </section>
          ) : null}
        </div>
      );
}

Modal.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  selection: PropTypes.number.isRequired
}

export default Modal;