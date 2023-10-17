import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Sidebar from "./components/sidebar";

export default function Category() {
  const { slug } = useParams();

  const [blogpost, setBlogpost] = useState("");
  const [articleLoader, setArticleLoader] = useState(true);
  const domain = "http://127.0.0.1:8000";
  // fecth Header
  const Headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173/", // Set this to your React app's URL
    },
  };

  // fethc articles from api
  const getArticle = () => {
    fetch(`http://127.0.0.1:8000/blogapi/articles/${slug}`, Headers)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setBlogpost(data);
        setArticleLoader(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  //fetch tage from api

  useEffect(() => {
    getArticle();
    <Helmet>
      <title>SBINFOHUB | {slug}</title>
    </Helmet>;
  }, []);

  return (
    <>
      <Header />

      <div className="container px-20 mt-10">
        <div className="grid grid-cols-3 gap-4">
          <div className=" col-span-2 pl-20 ">
            <div className="mx-auto max-w-2xl grid-cols-1 gap-x-8 gap-y-16  sm:mt-2 sm:pt-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
              {articleLoader ? (
                <p className="text-center mt-20 text-3xl">Loading ....</p>
              ) : blogpost.length > 0 ? (
                blogpost.map((post) => (
                  <article
                    key={post.slug}
                    className="flex max-w-xl items-start justify-between pb-4 mb-7  pt-3 first:pt-0 border-b border-gray-200 last:border-gray-50"
                    style={{ margin: "0 auto" }}
                  >
                    {/* flex-shrink-0 https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=3603&amp;q=80*/}
                    <div
                      className=""
                      style={{
                        width: "510px",
                        height: "121px",
                      }}
                    >
                      <img
                        src={`${domain}${post.thumbnail}`}
                        alt=""
                        className="object-cover rounded-lg"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div className="flex-grow ml-4">
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
                          href={post.category}
                          className="capitalize relative z-10 rounded-full bg-red-50 px-3 py-1 font-medium text-gray-900 hover:bg-red-700 hover:text-white"
                        >
                          {post.category_name}
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <>
                  <div className="text-center mt-20">
                    <p className="text-3xl font-bold mb-4">Nothing found</p>
                    <p className="text-gray-400 font-sans">
                      Your search did not return any result.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="Sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
