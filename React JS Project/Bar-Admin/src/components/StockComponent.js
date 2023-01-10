import style from "./StockComponent.module.css";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { Button } from "@mui/material";

function StockComponent({ index, PRDLST_NM, count, parentFunction }) {
    return (
        <li className={style.list}>
            <span className={style.kind}>{PRDLST_NM}</span>
            <span className={style.result}>{count}</span>
            <Button
                onClick={() => parentFunction(index)}
                variant="outlined"
                color="primary"
                sx={{ marginLeft: 7, marginTop: 2, marginBottom: 1 }}
            >
                <DeleteForeverSharpIcon />
            </Button>
        </li>
    );
}

export default StockComponent;
