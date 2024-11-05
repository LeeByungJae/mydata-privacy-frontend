import React from "react";
import "./CardStyle.css";
import Accordion from "./Accordion/Accordion";

export default function CardBack({ data, title, loading }) {
  if (!data || data.length === 0) {
    return <div className="no-data-text">제3자 제공 정보가 없습니다.</div>;
  }

  return (
    <div className="card-sub-container">
      <div className="card-title-container back">
        <p className="card-back-title">{title}</p>
        <p>제3자 제공 동의 정보</p>
      </div>
      <div className="card-content-container">
        {/* Accordion 컴포넌트에 데이터 전달 */}
        <Accordion data_providers={data} />
      </div>
    </div>
  );
}
