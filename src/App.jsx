import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NewProduct from "./pages/NewProduct";
import Products from "./pages/Products";
import Search from "./pages/Search";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/new-product">Tạo sản phẩm mới</Link>
            </li>
            <li>
              <Link to="/products">Danh sách sản phẩm</Link>
            </li>
            <li>
              <Link to="/search">Tìm kiếm</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
