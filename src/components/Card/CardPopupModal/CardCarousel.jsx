import React from "react";
import "./CardCarouselStyle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

export default function CardCarousel({
  providers,
  onSlideChange,
  currentIndex,
}) {
  if (!providers || providers.length === 0) return null;
  
  return (
    <section className="provider-wrapper">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.8}
        spaceBetween={40}
        speed={600}
        coverflowEffect={{
          rotate: 0,
          stretch: 20,
          depth: 150,
          modifier: 1.5,
          slideShadows: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        pagination={{ clickable: true, type: "fraction" }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        breakpoints={{
          // 화면 크기가 768px 이상일 때
          768: {
            slidesPerView: 1.8, // 태블릿 이상의 화면에서는 1.8개씩 보이게 설정
          },
          // 화면 크기가 576px 이하일 때 (모바일)
          576: {
            slidesPerView: 1, // 모바일에서는 1개씩 보이게 설정
          },
        }}
        onSlideChange={(swiper) => onSlideChange(swiper.realIndex)} // 슬라이드 변경 시 인덱스 전달
        className="card-carousel-container"
      >
        {providers.map((provider, index) => (
          <SwiperSlide key={index}>
            <article className="provider-container">
              <div className="provider-name-container">
                <span>정보전송자</span>
                <p>{provider.provider}</p>
              </div>
              <div className="provider-detail">
                <ul className="provider-detail-list">
                  {provider.providedData.map((item, itemIndex) => (
                    <li className="provider-item" key={itemIndex}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
