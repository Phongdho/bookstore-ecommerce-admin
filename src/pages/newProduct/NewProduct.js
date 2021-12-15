import {useState} from "react";
import "./newProduct.css";
import {addProduct} from "../../redux/apiCalls";
import {useDispatch} from "react-redux";

export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {...prev, [e.target.name]: e.target.value};
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const product = {...inputs, categories: cat};
    addProduct(product, dispatch);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input 
            name="img"
            type="text" 
            placeholder="Book image url"
            onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text" 
            placeholder="Book title"
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Highlight</label>
          <input
            name="highlight"
            type="text" 
            placeholder="Book highlight"
            onChange={handleChange} 
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input 
            name="desc"
            type="text"
            placeholder="This book's about..."
            onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Author</label>
          <input 
            name="author"
            type="text" 
            placeholder="Author"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            name="stock"
            type="text" 
            placeholder="123"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Page Number</label>
          <input 
            name="pageNum"
            type="text" 
            placeholder="123"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input 
            name="price"
            type="text" 
            placeholder="123"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input 
            type="text" 
            placeholder="fiction, literature"
            onChange={handleCat} />
        </div>

        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}