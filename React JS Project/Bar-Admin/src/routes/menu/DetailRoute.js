import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

function renderItem({ item }) {
    return (
        <ListItem>
            <ListItemText primary={item.name} />
        </ListItem>
    );
}

export default function SignUp() {
    const [menu, setMenu] = React.useState({});
    const [stock, setStock] = React.useState([]);
    const navigate = useNavigate();
    const params = useParams();

    React.useEffect(() => {
        fetch(`http://146.56.38.5:4000/menu/${params.id}`)
            .then((data) => data.json())
            .then((data) => {
                setMenu(data.result);
                setStock(data.result.ingredient);
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ mt: 3 }}>
                            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                <Typography variant="h6" gutterBottom>
                                    메뉴 이미지
                                </Typography>
                                <Box
                                    sx={{
                                        height: 200,
                                        width: 200,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 2,
                                        borderRadius: 1,
                                        bgcolor: (theme) => (theme.palette.mode === "light" ? "grey.100" : "grey.900"),
                                        overflow: "hidden",
                                        mb: 2,
                                    }}
                                >
                                    <Box sx={{ width: 200 }}>
                                        <Grid item xs={12}>
                                            <Box
                                                sx={{
                                                    minWidth: 200,
                                                    minHeight: 200,
                                                    maxWidth: 200,
                                                    maxHeight: 200,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <img
                                                    style={{ maxWidth: 120, maxHeight: 120 }}
                                                    src={`http://146.56.38.5:4000/images/${menu.image}`}
                                                />
                                            </Box>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h9" gutterBottom>
                                        메뉴 이름
                                    </Typography>
                                    <TextField fullWidth value={menu.name} readOnly />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h9" gutterBottom>
                                        메뉴 종류
                                    </Typography>
                                    <TextField fullWidth value={menu.type_name} readOnly />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h9" gutterBottom>
                                        메뉴 설명
                                    </Typography>
                                    <TextField fullWidth value={menu.summary} multiline rows={5} readOnly />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                onClick={() => {
                                    navigate(`/menu/edit/${menu.id}`);
                                }}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                수정
                            </Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={4} md={7}>
                    <Box sx={{ mt: 1 }}>
                        <List>
                            <TransitionGroup>
                                {stock.map((item) => (
                                    <Collapse key={item.id}>{renderItem({ item })}</Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
