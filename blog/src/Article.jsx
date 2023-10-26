import { APIENDPOITDOMAIN, ORIGIN } from "./components/constants/constants";
import React, { useEffect, useState, useContext } from "react";
import HTMLRenderer from "./components/HTMLrender";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import axios from "axios";

function Article() {
  const { slug } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [loadind, setLoading] = useState(true);
  const domain = APIENDPOITDOMAIN;

  const UpdateUserView = (postid) => {
    axios.post(`${domain}/blogapi/article-viewcount-update/`, {
      id: postid, // Replace with your data
    });
  };

  useEffect(() => {
    fetch(`${domain}/blogapi/article/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: ORIGIN, // Set this to your React app's URL
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
        setLoading(false);
        UpdateUserView(data.id);
      })
      .catch((error) => console.error("Error:", error));
  }, [slug]);

  return (
    <>
      <Header />

      {loadind ? (
        <p className="text-center mt-20">Loading..</p>
      ) : (
        <>
          <Helmet>
            <title>{`SBINFOHUB | ${articleData.title}`}</title>
            <meta name="description" content={articleData.title} />
            <meta name="robots" content="index, follow" />
          </Helmet>
          ;
          <div style={{ margin: "0 auto" }}>
            <div className="articleView lg:w-2/3   mx-auto mt-10  p-4 md:w-full  sm:w-full">
              <h1 className="text-6xl text-center mb-10">
                {articleData.title}
              </h1>
              <img
                src={articleData.image}
                className="richarticleimg"
                alt="blogpost image"
              />
              {/* article section */}
              <section>
                <div className="richtextArticle max-auto ">
                  <HTMLRenderer htmlContent={articleData.article} />
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Article;
