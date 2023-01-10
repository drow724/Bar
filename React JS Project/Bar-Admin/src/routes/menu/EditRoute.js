import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControlLabel, MenuItem, Select, Slide } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoCamera } from "@mui/icons-material";

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function renderItem({ item, handleRemoveStock }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" title="Delete" onClick={() => handleRemoveStock(item)}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText primary={item.name} />
        </ListItem>
    );
}

export default function SignUp() {
    const [types, setTypes] = React.useState([]);
    const [menu, setMenu] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [stock, setStock] = React.useState([]);
    const [stockCount, setStockCount] = React.useState(0);
    const [type, setType] = React.useState("");
    const [stockList, setStockList] = React.useState([]);
    const [src, setSrc] = React.useState("");
    const [image, setImage] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();

    const containerRef = React.useRef(null);

    const loadMoreItems = (event) => {
        if (event.target.scrollTop + ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP > event.target.scrollHeight - 10) {
            if (!(stockCount === stockList.length)) {
                setPage((current) => current + 1);
            }
            return;
        }
    };
    const MenuProps = {
        PaperProps: {
            onScroll: loadMoreItems,
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: "auto",
            },
        },
    };

    const handleClick = () => {
        menu.image = "";
        setChecked(false);
    };

    const handleChange = (event) => {
        let reader = new FileReader();
        reader.onload = function (e) {
            setSrc(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        setImage(event.target.files[0]);
        setChecked(true);
        event.target.value = "";
    };

    React.useEffect(() => {
        fetch(`http://146.56.38.5:4000/stock?page=${page + 1}`)
            .then((data) => data.json())
            .then((data) => {
                setStockCount(data.result.rowCount);
                setStockList((current) => [...current, ...data.result.stock]);
            });
    }, [page]);

    React.useEffect(() => {
        setChecked(true);
        fetch(`http://146.56.38.5:4000/menu/${params.id}`)
            .then((data) => data.json())
            .then((data) => {
                setSrc(data.result.image);
                setMenu(data.result);
                setStock(data.result.ingredient);
                setType(data.result.type_name);
            });
        fetch(`http://146.56.38.5:4000/menu/type/list`)
            .then((data) => data.json())
            .then((data) => setTypes(Object.values(data.result)));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get("name") === "") {
            alert("메뉴 이름을 입력하세요.");
            return;
        }
        if (type === "") {
            alert("메뉴 종류를 선택하세요.");
            return;
        }
        if (stock.length === 0) {
            alert("재료는 최소 1가지 이상 선택해주세요.");
            return;
        }
        if (data.get("summary") === "") {
            alert("메뉴 설명을 입력해주세요.");
            return;
        }

        const ingredient = JSON.stringify(stock);
        const body = {
            id: params.id,
            name: data.get("name"),
            type_name: type,
            ingredient: ingredient,
            summary: data.get("summary"),
        };

        image
            ? (async () => {
                  const form = new FormData();
                  form.append("id", params.id);
                  form.append("image", image);

                  await fetch("http://146.56.38.5:4000/menu/image", {
                      method: "PUT",
                      body: form,
                      headers: {
                          //"Content-Type": "application/json",
                      },
                  });
              })()
            : (body.image = menu.image);

        await fetch("http://146.56.38.5:4000/menu", {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/menu");
    };

    const handleTypeChange = (event) => {
        menu.type_name = "";
        setType(event.target.value);
    };

    const handleStockChange = (event) => {
        setStock((current) => {
            let dup = false;
            current.forEach((c) => {
                if (c.id === event.target.value.id) {
                    dup = true;
                    alert("중복된 메뉴가 존재합니다.");
                }
            });
            return dup ? [...current] : [...current, event.target.value];
        });
    };

    const handleRemoveStock = (item) => {
        setStock((prev) => [...prev.filter((i) => i !== item)]);
    };

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
                        <Typography component="h1" variant="h5">
                            새로운 메뉴 등록
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                onClick={handleClick}
                                                onChange={handleChange}
                                                component="label"
                                                direction="column"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <input hidden accept="image/*" type="file" />
                                                <PhotoCamera />
                                            </IconButton>
                                        }
                                    />
                                </Grid>
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
                                    ref={containerRef}
                                >
                                    <Box sx={{ width: 200 }}>
                                        <Grid item xs={12}>
                                            <Slide direction="up" in={checked} container={containerRef.current}>
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
                                                        src={
                                                            menu.image
                                                                ? `http://146.56.38.5:4000/images/${menu.image}`
                                                                : src
                                                        }
                                                    />
                                                </Box>
                                            </Slide>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h9" gutterBottom>
                                        메뉴 이름
                                    </Typography>
                                    <TextField fullWidth name="name" rows={1} multiline defaultValue={menu.name} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Select
                                        labelId="type_name"
                                        id="type_name"
                                        value={menu.type_name ? menu.type_name : type}
                                        label="종류"
                                        name="type_name"
                                        displayEmpty
                                        onChange={handleTypeChange}
                                    >
                                        <MenuItem value="">
                                            <em>종류 선택</em>
                                        </MenuItem>
                                        {types.map((t) => (
                                            <MenuItem value={t}>{t}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select
                                        labelId="ingredient"
                                        id="ingredient"
                                        value=""
                                        label="재료"
                                        displayEmpty
                                        onChange={handleStockChange}
                                        MenuProps={MenuProps}
                                    >
                                        <MenuItem value="">
                                            <em>재료 선택</em>
                                        </MenuItem>
                                        {stockList.map((s) => (
                                            <MenuItem value={s}>{s.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h9" gutterBottom>
                                        메뉴 설명
                                    </Typography>
                                    <TextField
                                        name="summary"
                                        fullWidth
                                        defaultValue={menu.summary}
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                            </Grid>
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
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
                                    <Collapse key={item.id}>{renderItem({ item, handleRemoveStock })}</Collapse>
                                ))}
                            </TransitionGroup>
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
