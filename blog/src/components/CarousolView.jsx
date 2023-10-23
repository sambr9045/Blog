import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const BlogSlider = ({ posts, domain }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id}>
          <div className="blog-post">
            {/* Display your blog post content here */}
            <img src={`${domain}${post.thumbnail}`} alt="" />
            <h2>{post.title}</h2>
            {/* Add any other content you want to display */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogSlider;
