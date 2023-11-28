import { useState, useEffect } from "react";
import { APIENDPOITDOMAIN } from "./constants/constants";

export default function Sidebar() {
  const [tags, setTags] = useState([]);
  const Headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost:5173/", // Set this to your React app's URL
    },
  };

  const getTags = () => {
    fetch(`${APIENDPOITDOMAIN}/blogapi/tags/`, Headers)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
        console.log(tags);
      })
      .catch((error) => console.error("error:", error));
  };
  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <div
        className=" p-5 rounded-md shadow-sm bg-red-50 sidebarRo"
        style={{ height: "450px" }}
      >
        {/* Seach input  */}
        {/* <div className="p-4">
              <label className="relative block">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                  placeholder="Search for anything..."
                  type="text"
                  name="search"
                />
              </label>
            </div> */}
        <div className="text-left text-2xl my-3">
          <h5 className="font-sans mb-5">Trending tags</h5>
        </div>

        <div className="flex flex-wrap">
          {tags.map((item) => (
            <div key={item.name} className="mb-4 pb-3">
              <a
                href="None"
                className="font-sans border shadow-sm bg-gray-50  rounded-3xl p-3 text-sm hover:bg-red-900 hover:text-white"
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>

        {/* <div className=" pl-7 text-md my-3 text-red-900 hover:text-red-700 text-left">
              <a href="/categories">Explore more</a>
            </div> */}
        {/* <p className="text-center hover:text-red-900 mt-10">
              <a
                href=""
                className="text-white bg-red-900 px-4 py-2 rounded-md shadow-sm"
              >
                Read More
              </a>
            </p> */}
      </div>
    </>
  );
}
