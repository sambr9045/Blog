import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import HTMLRenderer from "./components/HTMLrender";
import { Helmet } from "react-helmet";

function Article() {
  const { slug } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [loadind, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blogapi/article/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:5173/", // Set this to your React app's URL
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
        // <Helmet>
        //   <title>SBINFOHUB|{data.title}</title>
        // </Helmet>;
        setLoading(false);
      })
      .catch((error) => console.error("Error:", error));

    <Helmet>
      <title>SBINFOHUB | articles details</title>
    </Helmet>;
  }, [slug]);

  return (
    <>
      <Header />

      {loadind ? (
        <p className="text-center mt-20">Loading..</p>
      ) : (
        <>
          <div style={{ margin: "0 auto" }}>
            <div className="articleView w-2/3  mx-auto mt-10  p-4 ms:w-3/3` sm:text-lg">
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
