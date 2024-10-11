import React from "react";
import Slider from "react-slick";

const MostViewArticles = ({ most_view_article, domain }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto mt-5 mb-5">
      <Slider {...settings}>
        {most_view_article.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-start justify-between p-4"
          >
            <div className="ab tn">
              <img
                src={`${domain}${post.thumbnail}`}
                alt=""
                className="rounded-lg"
                style={{
                  width: "360px",
                  height: "200px",
                }}
              />
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
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
              <a href={`article/${post.slug}`}> {post.title} </a>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {post.description}
            </p>
          </article>
        ))}
      </Slider>
    </div>
  );
};

export default MostViewArticles;
