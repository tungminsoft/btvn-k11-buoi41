import React, { useState } from "react";
import "./ProductForm.css";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const ProductForm = ({ submitTitle = "" }) => {
  let navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    brand: "",
    sku: "",
    weight: 0,
    minimumOrderQuantity: 0,
    thumbnail: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const setFieldValue = (e) => {
    if (e.target.name === "tags")
      setProductData({ ...productData, [e.target.name]: e.target.value.split(',') })
    else
      setProductData({ ...productData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    productData.tags = productData.tags.map(e => e.trim())
    setErrors({})

    try {
      fetch("https://api01.f8team.dev/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(productData)
      })
        .then(res => res.json())
        .then(res => {
          if (res.errors)
            return setErrors(res.errors)

          navigate("/products")
        })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-input"
            placeholder="Tên sản phẩm"
            required
            value={productData.title}
            onChange={setFieldValue}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </div>

        <div className="form-group">
          <textarea
            name="description"
            className="form-textarea"
            placeholder="Mô tả sản phẩm"
            required
            value={productData.description}
            onChange={setFieldValue}
          />
          {errors.description && <p className="error-message">{errors.description}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="category"
            className="form-input"
            placeholder="Danh mục"
            required
            value={productData.category}
            onChange={setFieldValue}
          />
          {errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="price"
            className="form-input"
            placeholder="Giá ($)"
            required
            value={productData.price}
            onChange={setFieldValue}
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="discountPercentage"
            className="form-input"
            placeholder="Giảm giá (%)"
            required
            value={productData.discountPercentage}
            onChange={setFieldValue}
          />
          {errors.discountPercentage && <p className="error-message">{errors.discountPercentage}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="rating"
            className="form-input"
            placeholder="Đánh giá (0-5)"
            required
            value={productData.rating}
            onChange={setFieldValue}
          />
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="stock"
            className="form-input"
            placeholder="Tồn kho"
            required
            value={productData.stock}
            onChange={setFieldValue}
          />
          {errors.stock && <p className="error-message">{errors.stock}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="tags"
            className="form-input"
            placeholder="Tags (cách nhau bằng dấu phẩy)"
            required
            value={productData.tags.join(',')}
            onChange={setFieldValue}
          />
          {errors.tags && <p className="error-message">{errors.tags}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="brand"
            className="form-input"
            placeholder="Thương hiệu"
            required
            value={productData.brand}
            onChange={setFieldValue}
          />
          {errors.brand && <p className="error-message">{errors.brand}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="sku"
            className="form-input"
            placeholder="Mã SKU"
            required
            value={productData.sku}
            onChange={setFieldValue}
          />
          {errors.sku && <p className="error-message">{errors.sku}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="weight"
            className="form-input"
            placeholder="Trọng lượng (kg)"
            required
            value={productData.weight}
            onChange={setFieldValue}
          />
          {errors.weight && <p className="error-message">{errors.weight}</p>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="minimumOrderQuantity"
            className="form-input"
            placeholder="Số lượng tối thiểu"
            required
            value={productData.minimumOrderQuantity}
            onChange={setFieldValue}
          />
          {errors.minimumOrderQuantity && <p className="error-message">{errors.minimumOrderQuantity}</p>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="thumbnail"
            className="form-input"
            placeholder="URL hình ảnh"
            required
            value={productData.thumbnail}
            onChange={setFieldValue}
          />
          {errors.thumbnail && <p className="error-message">{errors.thumbnail}</p>}
        </div>

        <button type="submit" className="submit-button">
          {submitTitle}
        </button>
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default ProductForm;
