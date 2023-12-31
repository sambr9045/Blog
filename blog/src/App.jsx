import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import CategoryContext from "./components/context/CategorieContext";
import MainContext from "./components/context/MainContext";
import { APIENDPOITDOMAIN } from "./components/constants/constants";
import Home from "./Home";
import About from "./About";
import Articles from "./Articles";
import Article from "./Article";
import Contact from "./Contact";
import Category from "./Category";
import { Helmet } from "react-helmet";
import Search from "./Search";

function App() {
  const [categories, setCategories] = useState([]);
  const [mainData, setMainData] = useState();

  const getCategories = useCallback(() => {
    fetch(`${APIENDPOITDOMAIN}/blogapi/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:5173/", // Set this to your React app's URL
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error:", error));
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <CategoryContext.Provider value={categories}>
        <MainContext.Provider value={mainData}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/about"
                element={
                  <>
                    <Helmet>
                      <title>SBINFOHUB | about use </title>
                      <About />
                    </Helmet>
                  </>
                }
              />
              <Route path="/articles" element={<Articles />} />
              <Route path="/contact" element={<Contact />} />
            
              <Route path="/article/:slug" element={<Article />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Router>
        </MainContext.Provider>
      </CategoryContext.Provider>
    </>
  );
}

export default App;
