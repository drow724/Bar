import PropTypes from "prop-types";
import styles from "./ListComponent.module.css";
import styled, { keyframes, css } from "styled-components";

const Box = styled.div`
  margin-left: 100px;
  opacity: 50%;
  background-color: white;
  font-weight: 300;
  padding: 20px;
  border-radius: 5px;
  color: #adaeb9;
  display: grid;
  grid-template-columns: minmax(150px, 1fr) 2fr;
  grid-gap: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  ${(props) =>
    props.isSeleted &&
    css`
      animation: ${props.animation} 0.1s forwards;
    `}
`;

function List({ snippet, isSelected }) {
  const animation = keyframes`
    from {
      
    }
    to {
      margin-left: 20px;
      opacity: 100%;
    }
  `;

  return (
    <Box isSeleted={isSelected} animation={animation}>
      <img
        src={snippet.thumbnails.default.url}
        alt={snippet.title}
        className={styles.menu__img}
      />
      <div>
        <h2 className={styles.menu__title}>{snippet.title}</h2>
      </div>
    </Box>
  );
}

List.prototype = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default List;
