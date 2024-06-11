import { useEffect, useState } from "react";
import MyCarousel from "../components/MyCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => {
    return state.user.user;
  });

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
      {categories.length > 0 && (
        <div className="text-center mt-3">
          <img
            src="https://static-00.iconduck.com/assets.00/shopping-cart-emoji-256x256-uz4p7t7e.png"
            alt="logo"
            className="w-25"
          />
          <h1 className="text-mainColor">Supermercato Online</h1>
        </div>
      )}
      {categories.length > 0 && !user && (
        <div className="text-center mt-3">
          <Alert variant="success" className="custom-alert">
            <Alert.Heading>Effettua l'accesso per scoprire di più!</Alert.Heading>
          </Alert>
        </div>
      )}
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
