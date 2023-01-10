import React, { useEffect, useRef, useState } from "react";
import style from "./BarcodeRoute.module.css";
import StockComponent from "../components/StockComponent.js";
import { useNavigate } from "react-router-dom";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import OutboxSharpIcon from "@mui/icons-material/OutboxSharp";
import { Button } from "@mui/material";

function BarcodeRoute() {
    const [stock, setStock] = useState([]);
    const [key, setKey] = useState("");
    const input = useRef();

    const getKey = async () => {
        const json = await (await fetch("http://146.56.38.5:4000/stock/key")).json();
        setKey(json.result);
    };

    useEffect(() => {
        input.current.focus();
        getKey();
    }, []);

    const parentFunction = (index) => {
        setStock((current) => {
            return current.filter((c, i) => i !== index);
        });
    };

    const navigate = useNavigate();

    const send = async () => {
        const data = stock.map((s) => {
            const n = {};
            n.name = s.PRDLST_NM;
            n.barcode = s.BAR_CD;
            n.amount = s.count;
            return n;
        });
        await fetch("http://146.56.38.5:4000/stock", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/");
    };

    const keyDown = async (event) => {
        if (event.key === "Enter") {
            const json = await (
                await fetch(
                    `http://openapi.foodsafetykorea.go.kr/api/${key}/C005/json/1/5/BAR_CD=${event.target.value}`,
                )
            ).json();
            if (json.C005.total_count > 0) {
                setStock((current) => {
                    const isDup = current.filter((c) => c.BAR_CD === json.C005.row[0].BAR_CD);
                    if (isDup.length > 0) {
                        const newStock = current.map((c) => {
                            if (c.BAR_CD === json.C005.row[0].BAR_CD) {
                                c.count++;
                            }
                            return c;
                        });
                        return [...newStock];
                    } else {
                        json.C005.row[0].count = 1;
                        return [...current, json.C005.row[0]];
                    }
                });
                event.target.value = "";
                return false;
            } else {
                const stock = await (await fetch(`http://146.56.38.5:4000/stock/barcode/${event.target.value}`)).json();
                if (stock.result) {
                    setStock((current) => {
                        const isDup = current.filter((c) => c.BAR_CD === stock.result.barcode);
                        if (isDup.length > 0) {
                            const newStock = current.map((c) => {
                                if (c.BAR_CD === stock.result.barcode) {
                                    c.count++;
                                }
                                return c;
                            });
                            return [...newStock];
                        } else {
                            const s = {};
                            s.PRDLST_NM = stock.result.name;
                            s.BAR_CD = stock.result.barcode;
                            s.count = 1;
                            return [...current, s];
                        }
                    });
                }
                event.target.value = "";
            }
        }
    };

    return (
        <React.Fragment>
            <div id={style.container}>
                <div id={style.logo}>
                    <p>
                        barcode<span>search</span>
                    </p>
                </div>
                <div id={style.contInput}>
                    <div id={style.input_group}>
                        <input type="text" id={style.barcode} onKeyDown={keyDown} autoComplete="off" ref={input} />
                    </div>
                    <ul id={style.results}>
                        {stock.map((s, i) => (
                            <StockComponent key={i} index={i} {...s} parentFunction={parentFunction} />
                        ))}
                    </ul>
                </div>

                <div id={style.header}></div>
            </div>
            <Button
                onClick={() => {
                    navigate(`/`);
                }}
                variant="outlined"
                color="primary"
                sx={{ marginLeft: 1, marginTop: 1, marginBottom: 1 }}
            >
                <ArrowBackSharpIcon />
            </Button>
            <button onClick={send} className={style.complete}>
                <OutboxSharpIcon />
            </button>
        </React.Fragment>
    );
}

export default BarcodeRoute;
