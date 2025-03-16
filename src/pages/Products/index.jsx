import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Loading from "../../components/Loading";

const Products = () => {
  const params = new URLSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [page, setPage] = useState(+params.get("page") || 1)
  const [itemsPerPage, setItemsPerPage] = useState(+params.get("per_page") || 10)

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api01.f8team.dev/api/products?page=${page}&per_page=${itemsPerPage}`)
      .then(res => res.json())
      .then(res => {
        setProducts(res.data)
        setTotalPage(res.last_page)
        history.replaceState(null, null, `?page=${page}&per_page=${itemsPerPage}`)

        setIsLoading(false);
      })
  }, [page, itemsPerPage])

  return (
    <div className="page-container">
      <h1 className="page-title">Danh Sách Sản Phẩm</h1>
      {products.length === 0
        ? <p className="empty-message">Không có sản phẩm nào.</p>
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

export default Products;
