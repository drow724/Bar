import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MenuRoute.css";
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
        field: "summary",
        headerName: "설명",
        headerAlign: "center",
        align: "center",
        flex: 1,
    },
    {
        field: "type_name",
        headerName: "종류",
        headerAlign: "center",
        align: "center",
        maxWidth: 250,
        flex: 1,
    },
];

export default function RenderCellGrid() {
    const [selection, setSelection] = React.useState([]);
    const [menus, setMenus] = React.useState([]);
    const [rowCount, setRowCount] = React.useState(0);
    const [page, setPage] = React.useState(0);

    const navigate = useNavigate();

    const getMenus = () => {
        fetch(`http://146.56.38.5:4000/menu?page=${page + 1}`)
            .then((data) => data.json())
            .then((data) => {
                setMenus(data.result.menu);
                setRowCount(data.result.rowCount);
            });
    };

    React.useEffect(() => {
        getMenus();
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
                rows={menus}
                onRowClick={(param) => {
                    navigate(`/menu/${param.id}`);
                }}
                checkboxSelection
                disableSelectionOnClick
                autoHeight={true}
                columns={columns}
                onSelectionModelChange={(newSelection) => {
                    setSelection(newSelection);
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
                    await fetch("http://146.56.38.5:4000/menu", {
                        method: "DELETE",
                        body: JSON.stringify(selection),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    getMenus();
                }}
                variant="contained"
                color="primary"
                sx={{ marginLeft: 1, marginTop: 1 }}
            >
                <DeleteForeverSharpIcon />
            </Button>
            <Button
                onClick={() => {
                    navigate("/menu/add");
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
