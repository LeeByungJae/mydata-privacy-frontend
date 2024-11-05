import React, { useEffect, useState } from "react";
import DataPieChart from "../Chart/DataPieChart";
import CardSlider from "../CardSlider/CardSlider";
import "./ChartAndCardContainerStyle.css";
import { convertDataToChartData, getServiceTag } from "../../utils/utils";
import infoIcon from "../../assets/info.svg";

import RevokedCardSlider from "../CardSlider/RevokedCardSlider";
import CustomButton from "../common/button/CustomButton";

export default function ChartAndCardContainer({
  recentServices,
  activeServices,
  activeTab,
  showRevoked,
  setShowRevoked,
  revokedServices,

  // isViewAll,
  // setIsViewAll,
}) {
  const isRecent = activeTab === "recent";
  const cardsData = isRecent ? recentServices : activeServices;
  const chartData = convertDataToChartData(cardsData, false);
  const [isViewAll, setIsViewAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("recent");
  const [filteredCardsData, setFilteredCardsData] = useState(cardsData);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const [activeIndex, setActiveIndex] = useState(-1); // Add this for controlling active/inactive state
  const [activeIndex, setActiveIndex] = useState(
    Array.from({ length: chartData.length }, (_, i) => i)
  ); // 모든 파이가 처음에 활성화된 것처럼 보이게 설정

  // const subTitle = isRecent
  //   ? "전일 기준 1개월(30일)이전 정보조회"
  //   : "전일 기준 1년 (365일)이전 정보조회";

  useEffect(() => {
    setFilteredCardsData(cardsData);
  }, [cardsData]);

  // const handleViewAllToggle = () => {
  //   setIsViewAll(!isViewAll);
  // };

  const handlePieClick = (categoryName, index) => {
    if (categoryName === "전체") {
      handleViewAllClick(); // "전체" 클릭 시 전체 데이터를 표시
      return;
    }

    if (selectedCategory === categoryName) {
      setFilteredCardsData(cardsData); // 모든 데이터 표시
      setSelectedCategory(null);
      setActiveIndex(Array.from({ length: chartData.length }, (_, i) => i)); // 모든 파이 섹션 활성화
    } else {
      const filteredData = cardsData.filter(
        (service) => getServiceTag(service.service_code) === categoryName
      );
      setFilteredCardsData(filteredData);
      setSelectedCategory(categoryName);
      setActiveIndex([index]); // 선택한 파이 섹션만 활성화
    }
  };

  const handleViewAllClick = () => {
    setFilteredCardsData(cardsData); // 전체 데이터를 표시
    setSelectedCategory("전체"); // "전체" 카테고리 선택
    setActiveIndex(Array.from({ length: chartData.length }, (_, i) => i)); // 모든 파이 섹션을 활성화 상태로 표시
  };
  // const handlePieClick = (categoryName) => {
  //   // 현재 선택된 카테고리와 동일한 카테고리를 클릭한 경우 기본 데이터로 리셋
  //   if (selectedCategory === categoryName) {
  //     setFilteredCardsData(cardsData);
  //     setSelectedCategory(null);
  //   } else {
  //     const filteredData = cardsData.filter(
  //       (service) => getServiceTag(service.service_code) === categoryName
  //     );
  //     setFilteredCardsData(filteredData);
  //     setSelectedCategory(categoryName);
  //   }
  // };

  return (
    <section className="chart-card-main-container">
      <div className="chart-card-container">
        <div className="chart-card-section">
          <div className="chart-section">
            {/* <div className="chart-card-main-title"> */}
            <div className="card-slider-info-title">
              <img src={infoIcon} alt="info" />
              <p>
                {isRecent
                  ? "전일 기준 1개월(30일)이전 정보조회"
                  : "전일 기준 1년 (365일)이전 정보조회"}
              </p>
            </div>
            {/* </div> */}
            <div className="chart-pie">
              <DataPieChart
                data={chartData}
                onPieClick={handlePieClick}
                activeIndex={activeIndex}
              />
            </div>
            {/* 전체 보기 버튼 */}
            <div className="view-all-button-container">
              <CustomButton
                className="view-all"
                variant="primary"
                label="전체 카테고리 보기"
                onClick={handleViewAllClick}
              >
                <p> 전체보기</p>
              </CustomButton>
            </div>
          </div>
          <div className="card-section">
            <CardSlider
              cardsData={filteredCardsData}
              isViewAll={isViewAll}
              toggleViewAll={() => setIsViewAll(!isViewAll)}
              sortOrder={sortOrder}
              // setSortOrder={handleSortOrderChange}
            />
          </div>
        </div>

        {/* showRevoked 상태에 따라 철회 내역 표시 */}
        <div className="slider-line-container">
          <div className="slider-line"></div>
          {showRevoked ? (
            <p onClick={() => setShowRevoked(false)} className="toggle-link">
              철회 항목 닫기
            </p>
          ) : (
            <p onClick={() => setShowRevoked(true)} className="toggle-link">
              철회 항목 열기
            </p>
          )}
          <div className="slider-line"></div>
        </div>
        {/* 철회 내역 슬라이더 */}
        {showRevoked && (
          <RevokedCardSlider
            title="전송 철회 내역"
            subTitle={
              activeTab === "recent"
                ? "전일 기준 1개월(30일)이전 철회내역 정보조회"
                : "전일 기준 1년 (365일)이전 철회내역 정보조회"
            }
            cardsData={revokedServices}
          />
        )}
      </div>
    </section>
  );
}
