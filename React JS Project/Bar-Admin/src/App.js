import Main from "./routes/MainRoute";
import Barcode from "./routes/BarcodeRoute";
import Stock from "./routes/stock/StockRoute";
import StockAdd from "./routes/stock/AddRoute";
import StockDetail from "./routes/stock/DetailRoute";
import StockEdit from "./routes/stock/EditRoute";
import Menu from "./routes/menu/MenuRoute";
import MenuAdd from "./routes/menu/AddRoute";
import MenuDetail from "./routes/menu/DetailRoute";
import MenuEdit from "./routes/menu/EditRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/barcode" element={<Barcode />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/stock/:id" element={<StockDetail />} />
                <Route path="/stock/add" element={<StockAdd />} />
                <Route path="/stock/edit/:id" element={<StockEdit />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:id" element={<MenuDetail />} />
                <Route path="/menu/add/" element={<MenuAdd />} />
                <Route path="/menu/edit/:id" element={<MenuEdit />} />
            </Routes>
        </Router>
    );
}

export default App;
