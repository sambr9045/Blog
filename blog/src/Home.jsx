import { useState, useEffect } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import { Helmet } from "react-helmet";
const domain = "http://127.0.0.1:8000";
const headers = {
  "Content-Type": "application/json",
  Origin: "http://localhost:5173/", // Set this to your React app's URL
};

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
      <title>SBINFOHUB | Your Source for Diverse Blog Topics</title>
    </Helmet>;
  }, []);

  return (
    <>
      <Header />

      <div
        className="relative bg-cover bg-center inset-0"
        // style={{ backgroundImage: `url(${background4})` }}
      >
        {/* <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="text-white">Stay</span>{" "}
              <span className="text-red-900 text-bold"> informed</span>
            </h1>
            <p
              className="mt-6 text-lg leading-8 w-2/3 pt-5"
              style={{ margin: "0 auto" }}
            >
              Empowering you with curated insights and comprehensive knowledge
              to keep you well-informed and ahead of the curve. Stay tuned for
              expertly curated content on a wide range of topics
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-red-800  px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover: bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible: outline-red-900"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div> */}
        <div style={{ marginBottom: "13vh" }}>
          <Carousel />
        </div>
      </div>

      {/* Most views blogs  */}

      <div className="pt-4  pb-0 sm:py-8 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl ">
              Most viewed articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our most popular and highly-read articles, curated for
              your engagement and enjoyment.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {most_view_article.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="ab tn">
                  <img
                    src={`${domain}${post.thumbnail}`}
                    alt=""
                    className="mo tn adq aij aqe bxy cvd rounded-lg"
                    style={{ minWidth: "300px", minHeight: "200px" }}
                  />
                  <div className="aa ak adq bbt bbx bco"></div>
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.created_at} className="text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </time>
                  <a
                    href={`/category/${post.category_name}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category_name}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`article/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/articles/?query=mostpopular"
              className="py-3 px-4 bg-red-900 text-white rounded-md shadow-md"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      {/* Recent Blogs */}

      <div className="pt-10 sm:py-2 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl ">
              Recent Articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our latest articles covering a diverse range of topics.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {recent_articles.map((post) => (
              <>
                <article
                  key={post.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="ab tn">
                    <img
                      src={`${domain}${post.thumbnail}`}
                      alt=""
                      className="mo tn adq aij aqe bxy cvd rounded-lg"
                      style={{ minWidth: "300px", minHeight: "200px" }}
                    />
                    <div className="aa ak adq bbt bbx bco"></div>
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.created_at} className="text-gray-500">
                      {new Date(post.created_at).toLocaleString()}
                    </time>
                    <a
                      href={`/category/${post.category_name}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.category_name}
                    </a>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={`article/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  {/* <div className="relative mt-8 flex items-center gap-x-4">
                    <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div> */}
                </article>
              </>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/articles"
              className="py-3 px-4 bg-red-900 text-white rounded-md shadow-md"
            >
              Read More
            </a>
          </div>
        </div>
      </div>

      {/* Blog post */}

      <div className="pt-24  pb-0 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  lg:mx-0 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-red-900 sm:text-4xl ">
              articles
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our most popular and highly-read articles, curated for
              your engagement and enjoyment.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
            {articles.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between mt-4 mb-4"
              >
                <div className="ab tn">
                  <img
                    src={`${domain}${post.thumbnail}`}
                    alt=""
                    className="mo tn adq aij aqe bxy cvd rounded-lg"
                    style={{ minWidth: "300px", minHeight: "200px" }}
                  />
                  <div className="aa ak adq bbt bbx bco"></div>
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.created_at} className="text-gray-500">
                    {new Date(post.created_at).toLocaleString()}
                  </time>
                  <a
                    href={`/category/${post.category_name}`}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category_name}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.slug}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                {/* <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div> */}
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/articles/"
              className="py-3 px-4 bg-red-900 text-white rounded-md shadow-md"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
