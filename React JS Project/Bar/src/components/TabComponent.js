import PropTypes from "prop-types";
import styles from "./TabComponent.module.css";

function Tabs({ id, title, summary, selection }) {

    const isSeleted = selection === id;

    return (
        <div className={isSeleted ? `${styles.tab__focus} ${styles.tab}` : styles.tab}>
            <div>
                <h2 className={styles.tab__title}>
                    {title}
                </h2>
                <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
            </div>
            <input style={{display : "none"}} />
        </div>
    );
}

Tabs.prototype = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  selection: PropTypes.number.isRequired
}

export default Tabs;