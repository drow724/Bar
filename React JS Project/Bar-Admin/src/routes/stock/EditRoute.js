import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
    const [stock, setStock] = React.useState([]);
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect(() => {
        fetch(`http://146.56.38.5:4000/stock/${params.id}`)
            .then((data) => data.json())
            .then((data) => {
                setStock(data.result);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("name") === "") {
            alert("재고 이름을 입력하세요.");
            return;
        }
        if (data.get("barcode") === "") {
            alert("바코드을 입력해주세요.");
            return;
        }
        if (data.get("amount") === "") {
            alert("수량을 입력해주세요.");
            return;
        }

        const body = {
            id: params.id,
            name: data.get("name"),
            barcode: data.get("barcode"),
            amount: data.get("amount"),
        };

        await fetch("http://146.56.38.5:4000/stock", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/stock");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        새로운 재고 등록
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    재고 이름
                                </Typography>
                                <TextField fullWidth name="name" rows={1} multiline defaultValue={stock.name} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    바코드
                                </Typography>
                                <TextField fullWidth name="barcode" rows={1} multiline defaultValue={stock.barcode} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    수량
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="amount"
                                    value={stock.amount}
                                    onChange={(event) => {
                                        setStock({ ...stock, amount: event.target.value });
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            수정
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
