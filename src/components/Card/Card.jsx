import React, { useState } from "react";

// import TurnIcon from "../assets/turn.svg;"
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import "./CardStyle.css";
import CustomButton from "../common/button/CustomButton";

import CardDetailModal from "../Card/CardPopupModal/CardDetailModal";
import { formatDate, getServiceTag } from "../../utils/utils";
import { getServiceThirdPartyDetails } from "../../service/externalDataServices";
import CardRevokeFront from "./CardRevokeFront";

export default function Card({ card, isRevoked }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [thirdPartyData, setThirdPartyData] = useState(null);
  const [consentStatus, setConsentStatus] = useState(null); // 동의 상태 초기값 설정

  const serviceTag = getServiceTag(card.service_code);
  // 금융 또는 공공 태그일 때 `제3자 제공현황` 버튼 비활성화 설정
  const isThirdPartyButtonDisabled =
    serviceTag === "금융" || serviceTag === "공공";

  // 뒤집기 버튼 클릭 시 제3자 제공 데이터 조회
  const handleFlip = async () => {
    if (!isFlipped && card.share_requests?.length > 0) {
      const consentId = card.share_requests[0].consent_id;
      setLoadingData(true);
      try {
        const data = await getServiceThirdPartyDetails(consentId);        
        setThirdPartyData(data);
      } catch (error) {
        console.error("제3자 제공 데이터 조회 중 오류 발생:", error);
      } finally {
        setLoadingData(false);
      }
    }
    setIsFlipped(!isFlipped); // 카드 뒤집기
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // 철회된 카드일 경우
  // 철회된 카드의 기본 정보를 표시하는 앞면 컴포넌트
  if (card.consent_status === "REVOKED" || isRevoked) {
    return (
      <div className="card-container">
        <div className="card card-revoke">
          <div className="card-face card-front card-face-revoke">
            <CardRevokeFront
              title={card.service_code}
              serviceProvider={card.service_provider}
              //   console.log("currentCards", currentCards);
              dataProviders={card.data_provided}
              dataProvider={card.data_provider_code}
              revokedAt={formatDate(card.revoked_at)}
            />
          </div>
        </div>
      </div>
    );
  }
  console.log(card);
  // 일반 카드일 경우
  return (
    <div className={`card-container ${isFlipped ? "flipped" : ""}`}>
      <div className="card ">
        {/* 카드의 기본 정보를 표시하는 앞면 컴포넌트 */}
        <div className="card-face card-front">
          <CardFront
            title={card.title}
            date={formatDate(card.last_consent_date)}
            serviceProvider={card.serviceProvider}
            dataProviders={card.data_providers}
            serviceCode={card.service_code}
            fld_nm={card.fld_nm}
            lastConsentDate={formatDate(card.last_consent_date)}
            onFlip={() => setIsFlipped(!isFlipped)}
            onCardClick={handleShowModal}
          />
          <div className="btn-container">
            <CustomButton
              // className="custom-secondary-btn"
              className="custom-secondary-btn"
              variant="primary"
              size="md"
              label="제3자 제공현황"
              onClick={handleFlip}
              disabled={isThirdPartyButtonDisabled} // 금융/공공 태그일 때 비활성화
            />
            <CustomButton
              variant="primary"
              size="md"
              label="상세보기"
              onClick={handleShowModal}
            />
          </div>
        </div>

        {/* 제3자 제공 정보를 표시하는 뒷면 컴포넌트를 구현 */}
        <div className="card-face card-back">
          <CardBack
            title={card.title}
            data={thirdPartyData}
            loading={loadingData}
          />
          <div className="btn-container">
            <CustomButton
              className="custom-secondary-btn"
              variant="custom-secondary"
              size="md"
              label="돌아가기"
              onClick={handleFlip}
            />
          </div>
        </div>
      </div>
      {/* 모달 컴포넌트 */}
      <CardDetailModal
        show={showModal}
        onClose={handleCloseModal}
        card={card}
        serviceTag={serviceTag}
      />
    </div>
  );
}
