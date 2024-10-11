import { useState, useEffect } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { Helmet } from "react-helmet";
import { APIENDPOITDOMAIN } from "./components/constants/constants";
import { Card, CardContent, Typography } from "@mui/material";
import ArticleSlider from "./components/MostViewArticles";
import MostViewArticles from "./components/MostViewArticles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const domain = APIENDPOITDOMAIN;
const headers = {
  "Content-Type": "application/json",
  Origin: "http://sbinfohub.online", // Set this to your React app's URL
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const cards = [
  { title: "Card 1", content: "Content for card 1" },
  { title: "Card 2", content: "Content for card 2" },
  { title: "Card 3", content: "Content for card 3" },
  { title: "Card 4", content: "Content for card 4" },
  { title: "Card 5", content: "Content for card 5" },
];
const fetchData = (endpoint, setData) => {
  fetch(`${domain}/blogapi/${endpoint}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      if (endpoint === "articles/?limit=10") {
        setData(data.results);
      } else {
        setData(data);
      }
    })
    .catch((error) => console.error("Error:", error));
};

export default function Home() {
  const [most_view_article, setMost_view_article] = useState([]);
  const [recent_articles, setRecentarticles] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData("mostviewed/", setMost_view_article);
    fetchData("recentarticle/", setRecentarticles);
    fetchData("articles/?limit=10", setArticles);

    <Helmet>
      <title> SBINFOHUB | Your Source for Diverse Blog Topics </title>
    </Helmet>;
  }, []);

  return (
    <>
      <Header />
      <div
        className="relative bg-cover bg-center inset-0"
        // style={{ backgroundImage: `url(${background4})` }}
      >
        <div
          style={{
            marginBottom: "13vh",
          }}
        >
          <Carousel />
        </div>
      </div>
      {/* Most views blogs  */}
      <div className="pt-4  pb-0 sm:py-8 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl ">
              Most viewed articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our most popular and highly - read articles, curated for
              your engagement and enjoyment.
            </p>
          </div>

          <MostViewArticles
            most_view_article={most_view_article}
            domain={domain}
          />
        </div>
      </div>
      {/* Recent Blogs */}
      <div className="pt-16 pb-16 mb-10 sm:py-2  ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0  text-left">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl ">
              Recent Articles
            </h2>
            <p className="mt-2 sm:mt-10 text-lg leading-8 text-gray-600 ">
              Explore our latest articles covering a diverse range of topics.
            </p>
          </div>
          <ArticleSlider most_view_article={recent_articles} domain={domain} />
        </div>
      </div>
    </>
  );
}
