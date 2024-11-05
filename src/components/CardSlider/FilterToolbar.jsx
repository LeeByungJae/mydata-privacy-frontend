// FilterToolbar.js
import React from "react";
import { Dropdown } from "react-bootstrap";
import SquareCenterIcon from "../../assets/square-center.svg";
import "./CardSlider.css";

export default function FilterToolbar({
  sortOrder,
  setSortOrder,
  handleViewAll,
  isViewAll,
  isMobile,
}) {
  console.log(sortOrder, "sortOrder");
  return (
    <div className="filter-toolbar">
      <div className="filter-left-container">
        {!isMobile && (
          <div className="filter-view-all" onClick={handleViewAll}>
            <img src={SquareCenterIcon} alt="SquareCenter" />
            {isViewAll ? "전체보기 접기" : "전체보기"}
          </div>
        )}
      </div>
      <div className="filter-right-container">
        <Dropdown onSelect={(eventKey) => setSortOrder(eventKey)}>
          <Dropdown.Toggle variant="primary" id="dropdown-sort">
            {sortOrder === "recent" ? "최근 순" : "오래된 순"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="recent">최근 순</Dropdown.Item>
            <Dropdown.Item eventKey="old">오래된 순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
