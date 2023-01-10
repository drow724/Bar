import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import "./DetailRoute.css";
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
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    재고 이름
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={stock.name}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    바코드
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={stock.barcode}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h9" gutterBottom>
                                    수량
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={stock.amount}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            onClick={() => {
                                navigate(`/stock/edit/${stock.id}`);
                            }}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            수정
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
