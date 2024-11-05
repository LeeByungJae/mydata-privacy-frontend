import React from "react";
import "./CardStyle.css";
import { getServiceTag } from "../../utils/utils"; // 유틸 함수 불러오기

export default function CardRevokeFront({
  title,
  serviceProvider,
  dataProvider,
  dataProviders = [],
  revokedAt,
}) {
  const providedDataText =
    dataProviders && dataProviders.length > 0
      ? dataProviders.length > 1
        ? `${dataProviders[0]} 외 ${dataProviders.length - 1}건`
        : dataProviders[0]
      : "제공 항목 없음";
  // console.log(
  //   "CardRevokeFrontCardRevokeFrontCardRevokeFrontCardRevokeFrontCardRevokeFront",
  //   dataProviders
  // );

  return (
    <div className="card-sub-container">
      {/* 타이틀 */}
      <div className="card-title-container">
        <p>{title}</p>
        <div className="card-underline"></div>
      </div>
      {/* 카드 내용 */}
      <div className="card-content-container card-revoke-content-container">
        <ul className="card-content-list">
          <li>
            <span className="card-item-label">[정보수신자]</span>
            <span>{serviceProvider}</span>
          </li>
          <li>
            <span className="card-item-label">[정보전송자]</span>
            <span>{dataProvider}</span>
          </li>
          <li>
            <span className="card-item-label">[철회날짜]</span>
            <span>{revokedAt} </span>
          </li>
          <li>
            <span className="card-item-label">[철회항목]</span>
            <span>{providedDataText} </span>
          </li>
        </ul>
        <div className="card-tag-container">
          <div className="card-tag card-tag-revoke">#철회 완료</div>
        </div>
      </div>
    </div>
  );
}
