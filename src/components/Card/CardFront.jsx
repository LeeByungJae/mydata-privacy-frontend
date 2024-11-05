import React from "react";
import "./CardStyle.css";
import { getServiceTag } from "../../utils/utils"; // 유틸 함수 불러오기

export default function CardFront({
  title,
  serviceProvider,
  dataProviders = [],
  serviceCode,
  fld_nm,
  date,
  onFlip,
  onCardClick,
  lastConsentDate,
}) {
  const serviceTag = getServiceTag(serviceCode);
  const dataProvidersText =
    dataProviders && dataProviders.length > 0
      ? dataProviders.length > 1
        ? `${dataProviders[0].provider} 외 ${dataProviders.length - 1}건`
        : dataProviders[0].provider
      : "제공 기관 없음";

  const providedDataText =
    dataProviders && dataProviders.length > 0
      ? dataProviders[0].providedData.length > 1
        ? `${dataProviders[0].providedData[0]} 외 ${
            dataProviders
              .map((provider) => provider.providedData.length)
              .reduce((total, num) => total + num, 0) - 1
          }건`
        : dataProviders[0].providedData[0]
      : "제공 항목 없음";

  return (
    <div className="card-sub-container">
      {/* 타이틀 */}
      <div className="card-title-container">
        <p>{title}</p>
        <div className="card-underline card-revoke-underline "></div>
        <p className="card-date">{date}</p>
      </div>
      {/* 카드 내용 */}
      <div className="card-content-container">
        <ul className="card-content-list">
          <li>
            <span className="card-item-label">[정보수신자]</span>
            <span>{serviceProvider}</span>
          </li>
          <li>
            <span className="card-item-label">[정보전송자]</span>
            <span>{dataProvidersText}</span>
          </li>
          <li>
            <span className="card-item-label">[수신항목]</span>
            <span>{providedDataText} </span>
          </li>
        </ul>
        <div className="card-tag-container">
          {/* 서비스 코드 앞글자 2개에 따라 태그가 변화함 */}
          <div className="card-tag">#{fld_nm}</div>
          {serviceTag !== "금융" && serviceTag !== "공공" && (
            <>
              <div className="card-tag ">#철회 가능</div>
              <div className="card-tag">#제3자 제공 중</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
