import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

// import "../Card/CardPopupModal/CardCarouselStyle.css";
import Card from "../Card/Card";
import "./CardSwiperStyle.css";

const CardSwiper = ({
  cardsData,
  isRevoked = false,
  currentIndex,
  setCurrentIndex,
}) => {
  return (
    <section className="provider-wrapper">
      <Swiper
        // effect={"coverflow"}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        navigation
        modules={[Navigation]}
        // pagination={{ clickable: true, type: "fraction" }}
        // 페이지네이션 추가
        // grabCursor={true} // 모바일 환경에서 부드러운 슬라이드 기능 추가
        className="custom-swiper-container" // 고유한 클래스 적용
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
      >
        {cardsData.map((card, index) => (
          <SwiperSlide key={index}>
            <Card key={card.id} card={card} isRevoked={isRevoked} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CardSwiper;
