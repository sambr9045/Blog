import { useState, useEffect } from "react";
import { APIENDPOITDOMAIN, ORIGIN } from "../constants/constants";

const useArticleFetching = (initialUrl) => {
  const [blogpost, setBlogpost] = useState([]);
  const [articleLoader, setArticleLoader] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [nextPageLoading, setNextPageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const domain = APIENDPOITDOMAIN;

  const Headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: ORIGIN,
    },
  };

  const getArticle = (url) => {
    fetch(url, Headers)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlogpost([...blogpost, ...data.results]);
        setNextPage(data.next);
        setArticleLoader(false);
        setNextPageLoading(false);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleScroll = () => {
    if (
      !isLoading &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      nextPage
    ) {
      setIsLoading(true);
      setNextPageLoading(true);
      let url = `${domain}/blogapi/articles/${nextPage}`;
      getArticle(url);
    } else if (nextPage === null) {
      setNextPageLoading(false);
    }
  };

  useEffect(() => {
    if (nextPage === "") {
      getArticle(initialUrl);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextPage, initialUrl]);

  return {
    blogpost,
    articleLoader,
    nextPageLoading,
  };
};

export default useArticleFetching;
