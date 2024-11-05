import React from "react";
import CardSlider from "./CardSlider";

export default function CardSliderContainer({
  recentServices,
  activeServices,
  revokedServices,
}) {
  return (
    <div className="card-slider-list-container">
      <CardSlider
        title="최근 가입한 서비스"
        subTitle="전일 기준 1개월(30일)이전 정보조회"
        cardsData={recentServices}
      />
      <CardSlider
        title="이용중인 서비스"
        subTitle="전일 기준 1년 (365일)이전 정보조회"
        cardsData={activeServices}
      />
      <CardSlider
        title="전송 철회 내역"
        subTitle="전일 기준 1년 (365일)이전 철회내역 정보조회"
        cardsData={revokedServices}
        isRevoked={true} // 철회된 서비스용 CardSlider임을 표시
      />
    </div>
  );
}
