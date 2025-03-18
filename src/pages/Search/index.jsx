import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";
import "./Search.css";

const Search = () => {
  const params = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(+params.get("page") || 1)
  const [itemsPerPage, setItemsPerPage] = useState(+params.get("per_page") || 10)
  const [keyword, setKeyword] = useState(params.get("q") ?? "")

  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const handle = setTimeout(() => {
      setKeyword(inputValue)
    }
      , 500)

    return () => {
      clearTimeout(handle)
    }
  }, [inputValue]);

  useEffect(() => {
    if (keyword === ""){
      setProducts([])
      return;
    }

    setIsLoading(true);
    fetch(`https://api01.f8team.dev/api/products?q=${keyword}&page=${page}&per_page=${itemsPerPage}`)
      .then(res => res.json())
      .then(res => {
        setProducts(res.data)
        setTotalPage(res.last_page)

        history.replaceState(null, null, `?q=${keyword}&page=${page}&per_page=${itemsPerPage}`)

        setIsLoading(false);
      })
  }, [keyword, page, itemsPerPage])


  return (
    <div className="page-container">
      <h1 className="search-title">Tìm kiếm sản phẩm</h1>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nhập tên sản phẩm..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="search-button" onClick={() => setKeyword(inputValue)}>Tìm kiếm</button>
      </div>

      {products.length === 0
        ? <p className="empty-message">{keyword === "" ? "Vui lòng nhập từ khóa." : "Không tìm thấy sản phẩm nào."}</p>
        : <ProductList
          products={products}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      }

      {isLoading && <Loading />}
    </div>
  );
};

export default Search;
