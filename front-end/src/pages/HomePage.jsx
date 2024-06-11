import { useEffect, useState } from "react";
import MyCarousel from "../components/MyCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import Spinner from "react-bootstrap/Spinner";

const HomePage = () => {
  const dispatch = useDispatch();

  const products = useSelector(state => {
    return state.products.products;
  });

  const [categories, setCategories] = useState([]);
  const productsOnSale = products.filter(item => item.discounted === 1);

  const createdArrayOfObjCategories = arr => {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      let category = {
        category: arr[i].name,
        products: products.filter(item => item.category.name === arr[i].name),
      };
      newArray.push(category);
    }
    setCategories(newArray);
  };

  const getAllCategories = () => {
    fetch("/api/categories")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel reperimento dei dati");
        }
      })
      .then(data => {
        console.log(data);
        createdArrayOfObjCategories(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (categories.length === 0 && products.length === 0) {
      dispatch(getProducts());
    }
    if (products.length > 0 && categories.length === 0) {
      getAllCategories();
    }
  }, [products]);

  return (
    <>
      {categories.length === 0 && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <div className="text-center">
            <Spinner animation="grow" variant="mainColor" />
          </div>
        </div>
      )}
      {categories.length > 0 && <MyCarousel category={"Prodotti in Offerta"} products={productsOnSale} />}

      {categories.map((category, idx) => {
        return (
          <div key={idx}>
            <MyCarousel category={category.category} products={category.products} />
          </div>
        );
      })}
    </>
  );
};

export default HomePage;
