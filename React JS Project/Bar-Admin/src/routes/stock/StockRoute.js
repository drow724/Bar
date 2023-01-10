import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./StockRoute.css";
import { Button } from "@mui/material";
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const columns = [
    { field: "id", headerName: "ID", flex: 1, maxWidth: 50, headerAlign: "center", align: "center" },
    {
        field: "name",
        headerName: "이름",
        headerAlign: "center",
        align: "center",
        flex: 1,
        disabled: true,
    },
    {
        field: "barcode",
        headerName: "바코드",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
        field: "amount",
        type: "number",
        headerName: "수량",
        headerAlign: "center",
        align: "center",
        flex: 1,
        editable: true,
    },
];

export default function RenderCellGrid() {
    const [selection, setSelection] = React.useState([]);
    const [stocks, setStocks] = React.useState([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [page, setPage] = React.useState(0);

    const navigate = useNavigate();

    const getStocks = () => {
        fetch(`http://146.56.38.5:4000/stock?page=${page + 1}`)
            .then((data) => data.json())
            .then((data) => {
                setStocks(data.result.stock);
                setRowCount(data.result.rowCount);
            });
    };

    React.useEffect(() => {
        getStocks();
    }, [page]);

    return (
        <div style={{ width: "100%" }}>
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
            <DataGrid
                paginationMode="server"
                rowCount={rowCount}
                page={page}
                onPageChange={(newPage) => setPage(newPage)}
                pageSize={10}
                pagination
                rowsPerPageOptions={[10, 20]}
                rows={stocks}
                checkboxSelection
                disableSelectionOnClick
                autoHeight={true}
                columns={columns}
                onRowClick={(param) => {
                    navigate(`/stock/${param.id}`);
                }}
                onSelectionModelChange={(newSelection) => {
                    setSelection(newSelection);
                }}
                onCellEditCommit={(params) => {
                    String(params.value) !== String(params.formattedValue) &&
                        (async () => {
                            await fetch("http://146.56.38.5:4000/stock", {
                                method: "PUT",
                                body: JSON.stringify({
                                    id: params.id,
                                    amount: params.value,
                                }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                        })();
                }}
            />
            <Button
                onClick={async () => {
                    const arr = [];

                    selection.forEach((s) => {
                        const arg = {};
                        arg.id = s;
                        arr.push(s);
                    });
                    await fetch("http://146.56.38.5:4000/stock", {
                        method: "DELETE",
                        body: JSON.stringify(selection),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    getStocks();
                }}
                variant="contained"
                color="primary"
                sx={{ marginLeft: 1, marginTop: 1 }}
            >
                <DeleteForeverSharpIcon />
            </Button>
            <Button
                onClick={() => {
                    navigate("/stock/add");
                }}
                variant="contained"
                color="primary"
                sx={{ marginLeft: 1, marginTop: 1, float: "right" }}
            >
                <AddIcon />
            </Button>
        </div>
    );
}
