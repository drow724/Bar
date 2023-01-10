import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./MainRoute.module.css";

const buttonStyle = {
    display: "inline-block",
    margin: "0.75em",
    height: "100px",
    paddingTop: "1.35em",
    paddingBottom: "1.35em",
    paddingLeft: "1.1em",
    paddingRight: "1.1em",
    width: "15em",
    background: "#fffce1",
    outline: "none",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: 800,
    borderRadius: 5,
    "&.MuiButtonBase-root:hover": {
        bgcolor: "white",
    },
};
function MainRoute() {
    const navigate = useNavigate();

    return (
        <div className={style.container}>
            <div className={style.content_wrap}>
                <div className={style.content}>
                    <header className={style.codrops_header}>
                        <nav className={style.codrops_demos}>
                            <Button
                                onClick={() => (window.location.href = "http://129.154.202.77/bar/")}
                                sx={buttonStyle}
                            >
                                영업 페이지
                            </Button>
                            <Button onClick={() => navigate("/barcode")} sx={buttonStyle}>
                                바코드 찍기
                            </Button>
                            <Button onClick={() => navigate("/stock")} sx={buttonStyle}>
                                재고 관리
                            </Button>
                            <Button onClick={() => navigate("/menu")} sx={buttonStyle}>
                                메뉴 관리
                            </Button>
                        </nav>
                    </header>
                </div>
            </div>
        </div>
    );
}

export default MainRoute;
