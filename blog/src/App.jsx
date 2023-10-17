import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import About from "./About";
import Articles from "./Articles";
import Article from "./Article";
import Contact from "./Contact";
import Login from "./components/account/login";
import Cpanel from "./components/cpanel";
import CategoryContext from "./components/context/CategorieContext";
import Category from "./Category";
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet";
import Search from "./Search";

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogapi/categories/", {
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
  }, []);

  return (
    <>
      <CategoryContext.Provider value={categories}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Helmet>
                    <title>
                      SBINFOHUB | Your Source for Diverse Blog Topics
                    </title>
                  </Helmet>
                  <Home />
                </>
              }
            />
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
            <Route path="/login" element={<Login />} />
            <Route path="/cpanel" element={<Cpanel />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
      </CategoryContext.Provider>
    </>
  );
}

export default App;
