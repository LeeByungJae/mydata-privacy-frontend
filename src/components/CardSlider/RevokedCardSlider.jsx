// RevokedCardSlider.js
import React, { useState } from "react";
import Card from "../Card/Card";
import FilterToolbar from "./FilterToolbar";
import Pagination from "./Pagination";
import "./CardSlider.css";
import useWindowSize from "../../hooks/useWindowSize";
import infoIcon from "../../assets/info.svg";
import CardSwiper from "./CardSwiper";

export default function RevokedCardSlider({ subTitle, cardsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("recent");
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isViewAll, setIsViewAll] = useState(false);
  const windowSize = useWindowSize();

  // console.log("revokedServicesrevokedServicesrevokedServices", cardsData);
  const totalCards = cardsData.length;
  const totalPages = Math.ceil(totalCards / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleViewAll = () => {
    setIsViewAll((prev) => !prev);
    if (isViewAll) {
      setItemsPerPage(3); // 기본 개수로 돌아가기
    } else {
      setItemsPerPage(totalCards); // 전체보기 시 모든 카드를 한 페이지에 보여줌
    }
    setCurrentPage(1); // 첫 페이지로 이동
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // 페이지를 첫 페이지로 리셋
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  // revoked_at 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    return `${dateString.slice(0, 4)}-${dateString.slice(
      4,
      6
    )}-${dateString.slice(6, 8)}`;
  };

  const currentCards = [...cardsData]
    .sort((a, b) => {
      const dateA = new Date(formatDate(a.revoked_at));
      const dateB = new Date(formatDate(b.revoked_at));
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    })
    .slice(startIndex, startIndex + itemsPerPage);

  console.log(" 필터링 currentCards", currentCards);
  return (
    <div className="card-slider-container revoke-card-slider-container">
      <div className="card-slider-info-title">
        <img src={infoIcon} alt="info" />
        <p>{subTitle}</p>
      </div>
      <FilterToolbar
        sortOrder={sortOrder}
        setSortOrder={handleSortOrderChange}
        handleViewAll={handleViewAll}
        isViewAll={isViewAll}
        isMobile={windowSize.width <= 576}
      />

      {/* <section className="card-slider-list-container">
        <div className="card-grid ">
          {currentCards.map((card) => (
            <Card key={card.id} card={card} isRevoked={true} />
          ))}
        </div>
      </section> */}

      <section className="card-slider-list-container">
        {windowSize.width <= 576 ? (
          <CardSwiper
            cardsData={currentCards}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <div className="card-grid isRevoked">
            {currentCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
