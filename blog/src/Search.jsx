import { APIENDPOITDOMAIN, ORIGIN } from "./components/constants/constants";
import { useParams, useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleList from "./components/ArticleList";
import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/Header";
import { Helmet } from "react-helmet";

export default function Search() {
  const q = useSearchParams()[0].get("q");
  const [blogpost, setBlogpost] = useState([]);
  const [nextLink, setNexlink] = useState(null);
  const [hasMore, setHasemore] = useState(true);
  const [articleLoader, setArticleLoader] = useState(true);
  const [tags, setTags] = useState([]);
  const domain = APIENDPOITDOMAIN;
  // fecth Header
  const Headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN, // Set this to your React app's URL
    },
  };

  // fethc articles from api
  const getArticle = () => {
    fetch(`${domain}/blogapi/search?q=${q}`, Headers)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setArticleLoader(false);
        setBlogpost([...blogpost, ...data.results]);
        setNexlink(data.next);
        if (data.next) {
          setHasemore(true);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchMoreData = () => {
    if (nextLink) {
      fetch(nextLink, Headers)
        .then((response) => response.json())
        .then((data) => {
          setBlogpost([...blogpost, ...data.results]);
          setNexlink(data.next);
          console.log(setNexlink);
          if (!data.next) {
            setHasemore(false);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  //fetch tags from api

  const getTags = () => {
    fetch(`${domain}/blogapi/tags/`, Headers)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error("error:", error));
  };

  useEffect(() => {
    getArticle();
    getTags();
    <Helmet>
      <title>SBINFOHUB | {q}</title>
    </Helmet>;
  }, []);

  return (
    <>
      <Header />
      <div className="container lg:px-20 mt-10 article-content">
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 customPadding">
          <div className=" col-span-2 md:col-span-3 lg:pl-20 ">
            <div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <InfiniteScroll
                dataLength={blogpost.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-center mt-2">Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: "center" }} className="mt-2">
                    <b>Yay! You have seen it all</b>
                  </p>
                }
                // below props only if you need pull down functionality
              >
                <div>
                  {!articleLoader && blogpost.length === 0 ? (
                    <>
                      <div className="text-center mt-20">
                        <p className="text-3xl font-bold mb-4">Nothing found</p>
                        <p className="text-gray-400 font-sans">
                          Your search did not return any result.
                        </p>
                      </div>
                    </>
                  ) : (
                    blogpost.map((post) => (
                      <article
                        key={post.slug}
                        className="lg:flex sm:grid max-w-xl items-start justify-between pb-4 mb-7  pt-3 first:pt-0 border-b border-gray-200 last:border-gray-50"
                        style={{ margin: "0 auto" }}
                      >
                        <div
                          className=""
                          style={{
                            minWidth: "140px",
                            minHeight: "100px",
                          }}
                        >
                          <a href={`/article/${post.slug}`}>
                            <img
                              src={`${post.thumbnail}`}
                              alt=""
                              className="object-cover rounded-lg"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </a>
                        </div>
                        <div className="flex-grow lg:ml-4">
                          <h3 className="text-lg font-semibold leading-6 text-red-900 group-hover:text-gray-600">
                            <a href={`/article/${post.slug}`}>{post.title}</a>
                          </h3>
                          <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">
                            {/* <HTMLRenderer htmlContent={post.article} /> */}
                            {post.description}
                          </p>

                          <div className="flex items-center gap-x-4 text-xs mt-2">
                            <time
                              dateTime={post.created_at}
                              className="text-gray-900"
                            >
                              {new Date(post.created_at).toLocaleString()}
                            </time>
                            <a
                              href={`/category/${post.category_slug}`}
                              className="capitalize relative z-10 rounded-full bg-red-50 px-3 py-1 font-medium text-gray-900 hover:bg-red-700 hover:text-white"
                            >
                              {post.category_name}
                            </a>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </InfiniteScroll>
            </div>
          </div>
          {/* <div className="Sidebar">
            <Sidebar />
          </div> */}
        </div>
      </div>
    </>
  );
}
