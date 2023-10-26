import { APIENDPOITDOMAIN, ORIGIN } from "./components/constants/constants";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ArticleList from "./components/ArticleList";
export default function Category() {
  const { slug } = useParams();
  const [nextPage, setNextPage] = useState("");
  const [nextPageLoading, setNextPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [blogpost, setBlogpost] = useState("");
  const [articleLoader, setArticleLoader] = useState(true);
  const domain = APIENDPOITDOMAIN;
  // fecth Header
  const Headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN, // Set this to your React app's URL
    },
  };

  const getArticle = (url) => {
    fetch(url, Headers)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlogpost([...blogpost, ...data.results]); // Use spread operator to append data to the existing blogpost state
        setNextPage(data.next);
        setArticleLoader(false);
        setNextPageLoading(false);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  //fetch tage from api

  const handleScroll = () => {
    if (
      !isLoading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      nextPage
    ) {
      setIsLoading(true);
      setNextPageLoading(true);
      let url = `${domain}/blogapi/articles/${slug}${nextPage}`;
      getArticle(url);
    } else if (nextPage === null) {
      setNextPageLoading(false);
    }
  };

  useEffect(() => {
    if (nextPage === "") {
      getArticle(`${domain}/blogapi/articles/${slug}`);
    }
    <Helmet>
      <title>SBINFOHUB | {slug}</title>
    </Helmet>;

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPage]);

  return (
    <>
      <Header />

      <div className="container lg:px-20 mt-10 article-content">
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 customPadding">
          <div className=" col-span-2 md:col-span-3 lg:pl-20 ">
            <div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {articleLoader ? (
                <>
                  <div className="text-center mt-20">Loading .....</div>
                </>
              ) : (
                <>
                  <ArticleList
                    blogpost={blogpost}
                    articleLoader={articleLoader}
                  />
                </>
              )}
            </div>
            {nextPageLoading && (
              <section>
                <div className="text-center my-5 ">Loading....</div>
              </section>
            )}
          </div>
          {/* <div className="Sidebar">
            <Sidebar />
          </div> */}
        </div>
      </div>
    </>
  );
}
