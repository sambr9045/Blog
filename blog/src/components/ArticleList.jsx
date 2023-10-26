import { useState } from "react";
import { APIENDPOITDOMAIN } from "./constants/constants";

export default function ArticleList({ blogpost }) {
  const domain = APIENDPOITDOMAIN;

  return (
    <div>
      {blogpost.length > 0 ? (
        blogpost.map((post) => (
          <article
            key={post.slug}
            className="lg:flex  sm:grid max-w-xl items-start justify-between pb-4 mb-7  pt-3 first:pt-0 border-b border-gray-200 last:border-gray-50"
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
                  src={`${domain}${post.thumbnail}`}
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
                <time dateTime={post.created_at} className="text-gray-900">
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
  );
}
