import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/MenuComponent";
import styles from "./MenuRoute.module.css";
import { useNavigate } from "react-router-dom";
import useCommand from "@jaegeun/use-command";
import styled, { keyframes, css } from "styled-components";
import CartComponent from "../components/CartComponent";
import ConfirmComponent from "../components/ConfirmComponent";
import AlertModal from "../components/AlertModalComponent";
import audio from "../static/ESM_Perfect_App_Button_5_Organic_Simple_Classic_Game_Click.wav";
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
  animation: ${(props) =>
      css`
        ${props.animation} 0.5s forwards;
      `}
    ${(props) =>
      props.direction === "" &&
      `
      transform: translate(${0}px, ${560 - props.selection * 240}px)
    `};
`;

function MenuRoute({ socket }) {
  const [play] = useSound(audio, {
    volume: 0.1,
  });

  const doEvery = () => {
    play();
  };
  const [command, setCommand] = useState([]);

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [alertAmountModalOpen, setAlertAmountModalOpen] = useState(false);

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const closeAlertModal = () => {
    setAlertModalOpen(false);
  };

  const closeAlertAmountModal = () => {
    setAlertAmountModalOpen(false);
  };

  //API통신 완료 여부
  const [loading, setLoading] = useState(true);
  //menu context index
  const [menuDirection, setMenuDirection] = useState("");
  //cart context index
  const [cartDirection, setCartDirection] = useState("");
  //API 통신을 통해 가져온 메뉴
  const [menus, setMenus] = useState([]);
  //cart context index
  const [cartSelection, setCartSelection] = useState(0);

  //flg 선택 state
  const [menuFlag, setMenuFlag] = useState(true);
  const [orderFlag, setOrderFlag] = useState(false);

  //flg 선택 state
  const [bottomSize, setBottomSize] = useState();
  const [topSize, setTopSize] = useState();

  const getMenus = async () => {
    await fetch(`http://146.56.38.5:4000/menu?page=all`)
      .then((data) => data.json())
      .then((data) => setMenus(data.result.menu));
  };

  //index 선택 state
  const [menuSelection, setMenuSelection] = useState(1);

  const menuArrowUp = () => {
    if (menuSelection === 1) {
      setMenuSelection(menus.length);
      setMenuDirection("down");
    } else {
      setMenuSelection(menuSelection - 1);
      setMenuDirection("up");
    }
  };

  const menuArrowDown = async () => {
    if (menuSelection === menus.length) {
      setMenuSelection(1);
      setMenuDirection("up");
    } else {
      setMenuSelection(menuSelection + 1);
      setMenuDirection("down");
    }
  };

  const menuArrowRight = (async) => {
    if (menus.filter((m) => m.count > 0).length === 0) {
      setAlertModalOpen(true);
    } else {
      setMenuFlag(false);
      cartInput.current.focus();
      setCartSelection(1);
    }
  };

  const menuEnter = () => {
    if (menus.length === 0) {
      return false;
    }
    if (alertModalOpen) {
      setAlertModalOpen(false);
    } else if (alertAmountModalOpen) {
      setAlertAmountModalOpen(false);
    } else {
      setMenus((current) => {
        if (
          current[menuSelection - 1].count + 1 >
          current[menuSelection - 1].amount
        ) {
          setAlertAmountModalOpen(true);
          return [...current];
        }
        current[menuSelection - 1].count++;
        return [...current];
      });
      setMenuDirection("");
    }
  };

  const navigate = useNavigate();

  const menuEscape = () => {
    setMenus((current) => {
      current.map((c) => (c.count = 0));
      return [...current];
    });
    navigate("/main");
  };

  //target이 되는 Data와, 유효한 command 입력 시 항상 실행되는 함수, 그리고 탈출 전략
  const { onChange: menuChange, element: menuInput } = useCommand(
    doEvery,
    menuArrowUp,
    menuArrowDown,
    null,
    menuArrowRight,
    menuEnter,
    menuEscape
  );

  const cartArrowUp = () => {
    if (cartSelection === 1) {
      setCartSelection(menus.filter((m) => m.count > 0).length);
      setCartDirection("down");
    } else {
      setCartSelection(cartSelection - 1);
      setCartDirection("up");
    }
  };

  const cartArrowDown = () => {
    if (cartSelection === menus.filter((m) => m.count > 0).length) {
      setCartSelection(1);
      setCartDirection("up");
    } else {
      setCartSelection(cartSelection + 1);
      setCartDirection("down");
    }
  };

  const cartArrowLeft = () => {
    menuInput.current.focus();
    setMenuFlag(true);
    setCartSelection(0);
  };

  const cartEnter = () => {
    orderInput.current.focus();
    setOrderFlag(true);
  };

  let selected;
  let toBottom;
  let toTop;

  const parentFunction = (index, bottom, top) => {
    selected = index;
    toBottom = bottom;
    toTop = top;
  };

  const cartEscape = () => {
    setMenus((current) => {
      const newMenus = current.map((m) => {
        if (m.index === selected) {
          m.count--;
        }
        return m;
      });
      return [...newMenus];
    });
    setMenuDirection("");
    if (cartSelection !== 1) {
      const i = menus.find((m, i) => m.index === selected).count;
      if (i === 1) {
        setCartSelection((current) => current - 1);
      }
    }
    if (menus.filter((m) => m.count > 0).length === 1) {
      menuInput.current.focus();
      setCartSelection(0);
      setMenuFlag(true);
    }
  };

  const { onChange: cartChange, element: cartInput } = useCommand(
    doEvery,
    cartArrowUp,
    cartArrowDown,
    cartArrowLeft,
    null,
    cartEnter,
    cartEscape
  );

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
  };

  const orderEnter = async () => {
    const data = menus.filter((m) => m.count > 0);

    await fetch("http://146.56.38.5:4000/menu", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setMenus((current) => {
      const newMenus = current.map((m) => {
        m.count--;
        return m;
      });
      return [...newMenus];
    });
    return navigate("/order");
  };

  const orderEscape = () => {
    setOrderFlag(false);
    cartInput.current.focus();
  };

  const { onChange: orderChange, element: orderInput } = useCommand(
    doEvery,
    null,
    null,
    null,
    null,
    orderEnter,
    orderEscape
  );

  const animation = keyframes`
    ${
      menuDirection === "up" &&
      `
      from {
        transform: translate(${0}px, ${560 - (menuSelection + 1) * 350}px)
      }
      to {
        transform: translate(${0}px, ${560 - menuSelection * 350}px)
      }
    `
    }
    ${
      menuDirection === "down" &&
      `
      from {
        transform: translate(${0}px, ${560 - (menuSelection - 1) * 350}px)
      }
      to {
        transform: translate(${0}px, ${560 - menuSelection * 350}px)
      }
    `
    }
  `;

  const ref = useRef();

  useEffect(() => {
    setBottomSize(ref.current.getBoundingClientRect().bottom);
    setTopSize(ref.current.getBoundingClientRect().top);
    if (bottomSize < toBottom && cartDirection === "down") {
      ref.current.scrollTop = toBottom;
    }
    if (topSize > toTop && cartDirection === "up") {
      ref.current.scrollTop = toBottom - 50;
    }
    if (cartSelection === 1) {
      ref.current.scrollTop = 0;
    }
    if (menuFlag || menus.filter((m) => m.count > 0).length === 0) {
      menuInput.current.focus();
    } else if (orderFlag) {
      orderFlag.current.focus();
    } else {
      cartInput.current.focus();
    }
    getMenus();
    setLoading(false);
    socket.on("onmessage", (data) => {
      setCommand((current) => [...current, data]);
    });
    return () => {
      socket.off("onmessage");
    };
  }, []);

  const messaging = (e) => {
    if (menuFlag) {
      menuInput.current.dispatchEvent(e);
    } else if (orderFlag) {
      orderInput.current.dispatchEvent(e);
    } else {
      cartInput.current.dispatchEvent(e);
    }
  };

  useEffect(() => {
    const e = new KeyboardEvent("keydown", {
      bubbles: true,
      cancelable: true,
      key: command[command.length - 1],
    });
    messaging(e);
  }, [command]);

  return (
    <React.Fragment>
      {orderFlag ? (
        <React.Fragment>
          <AlertModal
            open={confirmModalOpen}
            close={closeConfirmModal}
            title={"확인"}
            contents={"주문이 완료 되었습니다."}
            socket={socket}
          />
          <ConfirmComponent menus={menus} setMenus={setMenus} />
        </React.Fragment>
      ) : (
        <div className={styles.container}>
          <AlertModal
            open={alertModalOpen}
            close={closeAlertModal}
            title={"경고"}
            contents={"메뉴를 선택해 주세요"}
            socket={socket}
          />
          <AlertModal
            open={alertAmountModalOpen}
            close={closeAlertAmountModal}
            title={"경고"}
            contents={"제한 갯수를 초과하였습니다."}
            socket={socket}
          />
          {loading ? (
            <div className={styles.loader}>
              <span>Loading...</span>
            </div>
          ) : menus.length > 0 ? (
            <Box
              direction={menuDirection}
              animation={animation}
              selection={menuSelection}
            >
              {menus.map((menu) => (
                <Menu
                  key={menu.index}
                  {...menu}
                  isSelected={menuSelection === menu.index}
                  menuFlag={menuFlag}
                />
              ))}
            </Box>
          ) : (
            <div className={styles.none}>
              <h1>주문 가능한 메뉴가 없습니다.</h1>
            </div>
          )}
          <div ref={ref} className={styles.main}>
            {menus
              .filter((m) => m.count > 0)
              .map((menu, i) => {
                return (
                  <CartComponent
                    bottomSize={bottomSize}
                    key={menu.index}
                    i={i++}
                    {...menu}
                    cartSelection={cartSelection}
                    ordering={orderFlag}
                    parentFunction={parentFunction}
                  />
                );
              })}
          </div>
        </div>
      )}
      <input
        ref={menuInput}
        onKeyDown={menuChange}
        style={{ opacity: 0, width: 0, position: "fixed" }}
      />
      <input
        ref={cartInput}
        onKeyDown={cartChange}
        style={{ opacity: 0, width: 0, position: "fixed" }}
      />
      <input
        ref={orderInput}
        onKeyDown={orderChange}
        style={{ opacity: 0, width: 0, position: "fixed" }}
      />
    </React.Fragment>
  );
}

export default MenuRoute;
