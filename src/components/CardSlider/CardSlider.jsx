import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import FilterToolbar from "./FilterToolbar";
import Pagination from "./Pagination";
import "./CardSlider.css";
import useWindowSize from "../../hooks/useWindowSize";
import CardSwiper from "./CardSwiper";

export default function CardSlider({ cardsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sortOrder, setSortOrder] = useState("recent");
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [isViewAll, setIsViewAll] = useState(false);
  const windowSize = useWindowSize();

  const totalCards = cardsData.length;
  const totalPages = Math.ceil(totalCards / itemsPerPage);

  useEffect(() => {
    // 화면 크기에 따라 itemsPerPage 설정
    if (isViewAll) {
      setItemsPerPage(totalCards); // 전체보기일 경우 모든 카드
    } else if (windowSize.width <= 1600) {
      setItemsPerPage(2); // 1440px 이하일 때는 2개씩 보여줌
    } else {
      setItemsPerPage(2); // 기본값은 3개
    }
  }, [windowSize.width, isViewAll, totalCards]);
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
  const formatDate = (dateString) => {
    return `${dateString.slice(0, 4)}-${dateString.slice(
      4,
      6
    )}-${dateString.slice(6, 8)}`;
  };

  const currentCards = cardsData
    .sort((a, b) => {
      const dateA = new Date(formatDate(a.last_consent_date));
      const dateB = new Date(formatDate(b.last_consent_date));
      return sortOrder === "recent" ? dateB - dateA : dateA - dateB;
    })
    .slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card-slider-container">
      <FilterToolbar
        sortOrder={sortOrder}
        setSortOrder={handleSortOrderChange}
        handleViewAll={handleViewAll}
        isViewAll={isViewAll}
        isMobile={windowSize.width <= 576}
      />

      <section className="card-slider-list-container">
        {windowSize.width <= 576 ? (
          <CardSwiper
            cardsData={currentCards}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ) : (
          <div className="card-grid">
            {currentCards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
        )}
      </section>

      <Pagination
        currentPage={windowSize.width <= 576 ? currentIndex + 1 : currentPage}
        totalPages={windowSize.width <= 576 ? currentCards.length : totalPages}
        hideButtons={windowSize.width <= 576}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
