import React from "react";
import "./CardSlider.css";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hideButtons,
}) {
  return (
    <div className="pagination">
      <div className="pagination-bg">
        <div>
          {currentPage}
          <span>/{totalPages} </span>
        </div>
        {!hideButtons && (
          <>
            <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>
            <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
          </>
        )}
      </div>
    </div>
  );
}
