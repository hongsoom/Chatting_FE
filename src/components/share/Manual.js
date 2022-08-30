import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import fourth from "../../assets/fourth.png";
import fifth from "../../assets/fifth.png";
import sixth from "../../assets/sixth.png";

const Manual = () => {
  const images = [first, second, third, fourth, fifth, sixth];

  return (
    <Container>
      <Swiper
        spaceBetween={100}
        slidesPerView={1}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        styele={{
          MaxWidth: "500px",
          width: "100%",
          height: "221px",
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
        }}
      >
        {images.map((list, i) => (
          <SwiperSlide
            styele={{
              width: "335px",
              height: "221px",
            }}
          >
            <img src={list} alt="manual" key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  margin-right: 50px;
  img {
    width: 100%;
  }
`;
export default Manual;
