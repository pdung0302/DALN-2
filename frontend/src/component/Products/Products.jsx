import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from "@material-ui/core/Typography";
// import { useAlert } from "react-alert";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/backgroundHome1.webp";

import bg3 from "../../Assets/backgroundHome2.jpg";
import bg4 from "../../Assets/productBanner/NEW_ARRIVALS.png";

const categories = ["Áo hoodie", "Others"];
const styleman = [
  "Áo thun nam",
  "Áo sơ mi nam",
  "Áo khoác nam",
  "Quần short nam",
  "Quần dài nam",
];
const stylegirl = [
  "Áo thun nữ",
  "Áo sơ mi nữ",
  "Áo khoác nữ",
  "Quần short nữ",
  "Quần dài nữ",
  "Chân váy nữ",
  "Đầm nữ",
  "Yếm",
];
const accessory = [
  "Túi xách",
  "Giày nữ",
  "Thắt lưng",
  "Kính mắt",
  "Giày nam",
  "Ví",

]

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState("");

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Sản phẩm" />
          <Header />
          <div>

            <div style={{justifyContent:"center", alignItems:"center"}}>
            <div className="productBanner">
            <Carousel style={{
                overflow:"hidden",
                height:"10vh"
               }}>
                 <img src={bg} className="bgImgi"/>
               
                 <img src={bg3} className="bgImgi"/>
                 <img src={bg4} className="bgImgi"/>
               </Carousel>
            </div>
            </div>
            {products.length === 0 ? (
              ""
            ) : (
              <h2
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid rgba(21,21,21,0.5)",
                  width: "20vmax",
                  fontSize: "1.4vmax",
                  fontFamily: "Poppins,sans-serif",
                  margin: "3vmax auto",
                  color: "rgb(0, 0, 0, 0.7)", 
                }}
              >
                SẢN PHẨM
              </h2>
            )}
            <div
              className="sidebar__product"
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              <div
                className="sidebar__products"
                style={{
                  border: "1px solid #999",
                  margin: "1vmax",
                  flex: ".177",
                }}
              >
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  DANH MỤC
                </Typography>
                <ul className="categoryBox">
                  <li className="category-link" onClick={() => setCategory()}>
                    Tất cả
                  </li>
                  {categories.map((category) => (
                  <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                    + {category}
                    </li>
                  ))}
                </ul>
                {/* <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>Thời trang nam</Typography>
                  <li className="category-link">
                      My Carts
                  </li>
                  <li className="category-link">
                      Favourites Items
                  </li>
                  <li className="category-link">
                      Go to Checkout
                  </li> */}
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Thời trang nam
                </Typography>
                <ul className="categoryBox">
                  {styleman.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                     + {category}
                    </li>
                  ))}
                </ul>
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Thời trang nữ
                </Typography>
                <ul className="categoryBox">
                  {stylegirl.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                     + {category}
                    </li>
                  ))}
                </ul>
                <Typography style={{ fontSize: "1.2vmax", padding: "5px" }}>
                  Phụ kiện
                </Typography>
                <ul className="categoryBox">
                  {accessory.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                      type="checkbox"
                    >
                     + {category}
                    </li>
                  ))}
                </ul>
              </div>

              {products.length === 0 ? (
                <span
                  style={{
                    display: "block",
                    padding: "30px 0",
                    fontSize: "1.5rem",
                    flex: ".9",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy sản phẩm trong danh mục này....
                </span>
              ) : (
                <div
                  className="products"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    flex: ".9",
                  }}
                >
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              )}
            </div>

            <div
              className="pagination__box"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "6vmax",
              }} 
            >
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
