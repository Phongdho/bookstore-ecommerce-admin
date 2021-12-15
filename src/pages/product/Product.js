import { Link, useLocation } from "react-router-dom";
import {useState, useMemo, useEffect} from "react";
import { useSelector } from "react-redux";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { userRequest } from "../../apiService";
import { Publish } from "@material-ui/icons";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    // console.log(location.pathname);

    const [productStats, setProductStats] = useState([]);

    const MONTHS = useMemo (() => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ], []); //MONTHS will be dependency but will never change

    useEffect (() => {
        const getStats = async () => {
          try {
            const res = await userRequest.get("orders/income?proId=" + productId);
            console.log("res", res);
            const list = res.data.sort((a, b) => {
                return a._id - b._id
            })
            list.map((item) => {
              setProductStats((prev) => [
                ...prev,
                {name: MONTHS[item._id - 1], Sales: item.total}
              ])
            })
          } catch (err) {
              console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);
      console.log(productStats);

    const product = useSelector(state => 
        state.product.products.find((product) => 
            product._id === productId));

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id: </span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">{productStats[0]?.Sales} USD</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">stocks:</span>
                      <span className="productInfoValue">{product.stock} units</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title}/>
                  <label>Product Price</label>
                  <input type="text" placeholder={product.price}/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}