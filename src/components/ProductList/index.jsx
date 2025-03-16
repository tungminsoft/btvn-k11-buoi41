import "./ProductList.css";

function ProductList({ products, totalPage, page, setPage, itemsPerPage, setItemsPerPage }) {

  return (
    <div className="product-list-container">

      <ul className="product-list">
        {products.map(product => (
          <li className="product-item">
            <img
              src={product.thumbnail}
              alt=""
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p className="product-stock">Còn {product.stock} sản phẩm</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination-container">
        <div className="items-per-page">
          <label for="itemsPerPage">Hiển thị:</label>
          <select id="itemsPerPage" className="items-select" value={itemsPerPage} onChange={(e) => setItemsPerPage(e.target.value)}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="pagination">
          <button className={`page-button ${page <= 1 ? "disabled" : ""}`} disabled={page <= 1} onClick={() => setPage(page - 1)}>⬅ Trước</button>

          <div className="page-numbers">
            {[...Array(totalPage)].map((_, index) =>
              <button className={`page-number ${+page === index + 1 ? "active" : ""}`} onClick={() => setPage(index + 1)}>{index + 1}</button>)
            }
          </div>

          <button className={`page-button ${page >= totalPage ? "disabled" : ""}`} disabled={page >= totalPage} onClick={() => setPage(page + 1)}>Tiếp ➡</button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
