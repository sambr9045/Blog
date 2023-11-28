// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
//import "../../dist/output.css";
// import "./styles.css";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function Carousel() {
  const TextonImage = {
    position: "absolute",
    zIndex: 19,
    top: "24%",
    left: 0,
    right: 0,
    textAlign: "left",
    boxSizing: "border-box",
    // width: "60%",
    margin: "0 auto", // Center the element
    padding: "5%",
    borderRadius: "5px",
  };

  const Overlay = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    zIndex: 10,
    mixBlendMode: "multiply",
  };
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="container"
            style={{
              backgroundImage: "url('/img/carousol/1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="relative p-2" style={TextonImage}>
              <h2 className="font-bold text-white" style={{ fontSize: "3rem" }}>
                Personal Finance
              </h2>
              <p className="text-gray-300 mt-2 carousole_text">
                Explore the world of managing money, budgeting, saving,
                investing, and making informed financial decisions. Learn
                strategies to achieve your financial goals, build wealth, and
                secure a stable future.
              </p>
              <br />
              <a
                href="button"
                className="text-white bg-red-900 py-2 px-4 rounded-md shadow-lg hover:bg-red-700 "
              >
                Read More
              </a>
            </div>
            <div className="filter-div" style={Overlay}></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="container"
            style={{
              backgroundImage: "url('/img/carousol/3.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="relative p-2" style={TextonImage}>
              <h2 className="font-bold text-white" style={{ fontSize: "3rem" }}>
                Information Technogoy
              </h2>
              <p className="text-gray-300 mt-2 carousole_text">
                Uncover the world of computer systems, software, and data
                management. Learn to harness technology for efficient
                information processing and seamless communication across
                industries. Explore digital innovation's impact on modern soc
              </p>
              <br />
              <a
                href="button"
                className="text-white bg-red-900 py-2 px-4 rounded-md shadow-lg hover:bg-red-700 "
              >
                Read More
              </a>
            </div>
            <div className="filter-div" style={Overlay}></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="container"
            style={{
              backgroundImage: "url('/img/carousol/4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="relative p-2" style={TextonImage}>
              <h2 className="font-bold text-white" style={{ fontSize: "3rem" }}>
                Education
              </h2>
              <p className="text-gray-300 mt-2 carousole_text ">
                Embark on a journey through the realm of education, where you'll
                delve into the intricacies of learning, teaching methodologies,
                and educational technology. Discover how technology empowers
                efficient information processing and seamless communication in
                diverse fields. Explore how digital innovation is reshaping
                modern society's approach to education and knowledge
                dissemination.
              </p>
              <br />
              <a
                href="button"
                className="text-white bg-red-900 py-2 px-4 rounded-md shadow-lg hover:bg-red-700 "
              >
                Read More
              </a>
            </div>
            <div className="filter-div" style={Overlay}></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            className="container"
            style={{
              backgroundImage: "url('/img/carousol/5.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "90vh",
              position: "relative",
            }}
          >
            <div className="relative p-2" style={TextonImage}>
              <h2 className="font-bold text-white" style={{ fontSize: "3rem" }}>
                Travel
              </h2>
              <p className="text-gray-300 mt-2 carousole_text">
                Embark on journeys to captivating destinations, unravel travel
                tips, and immerse yourself in cultural experiences. From hidden
                gems to iconic landmarks, discover the world through our travel
                guides and recommendations.
              </p>
              <br />
              <a
                href="button"
                className="text-white bg-red-900 py-2 px-4 rounded-md shadow-lg hover:bg-red-700 "
              >
                Read More
              </a>
            </div>
            <div className="filter-div" style={Overlay}></div>
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
