import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ChartAndCardContainer from "../../components/Chart/ChartAndCardContainer";
import "./ServicesPageStyle.css";
import RevokedCardSlider from "../../components/CardSlider/RevokedCardSlider";

// 날짜 범위 계산 함수 (전일 기준)
const getDateRange = (days) => {
  const today = new Date();
  today.setDate(today.getDate() - 1); // 오늘에서 하루 전으로 설정
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - days);

  const formatDate = (date) =>
    `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return `(${formatDate(startDate)} ~ ${formatDate(today)})`;
};

export default function ServicesPage({
  recentServices,
  activeServices,
  revokedServices,
  recentRevokedServices,
}) {
  const [showRevoked, setShowRevoked] = useState({
    0: false,
    1: false,
    2: false,
  }); // 철회하기 보기 토글
  const [activeKey, setActiveKey] = useState([]);
  // const [isViewAll, setIsViewAll] = useState({ 0: false, 1: false, 2: false });

  // console.log("revokedServicesrevokedServicesrevokedServices", revokedServices);
  // 아코디언 상태가 변경될 때 showRevoked를 업데이트
  const handleAccordionToggle = (key) => {
    setActiveKey((prevActiveKey) => {
      if (prevActiveKey.includes(key)) {
        // 닫힐 때 해당하는 showRevoked만 false로 설정
        setShowRevoked((prevShowRevoked) => ({
          ...prevShowRevoked,
          [key]: false,
        }));
        return prevActiveKey.filter((item) => item !== key);
      } else {
        return [...prevActiveKey, key];
      }
    });
  };

  return (
    <div className="services-page">
      <Accordion
        activeKey={activeKey}
        onSelect={(eventKey) => handleAccordionToggle(eventKey)}
        className="services-accordion"
      >
        <Accordion.Item eventKey="0" className="services-accordion-item">
          <Accordion.Header className="services-accordion-header">
            <div className="services-accordion-title">
              <p>
                최근
                <span className="highlight-number">
                  {recentServices.length}
                </span>
                건의 서비스에 가입했어요
              </p>
              <p className="date-range">{getDateRange(30)}</p>
            </div>
          </Accordion.Header>
          <Accordion.Body className="services-accordion-body">
            <ChartAndCardContainer
              recentServices={recentServices}
              activeServices={activeServices}
              revokedServices={recentRevokedServices}
              activeTab="recent"
              showRevoked={showRevoked[0]}
              setShowRevoked={(value) =>
                setShowRevoked((prev) => ({ ...prev, 0: value }))
              }
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" className="services-accordion-item">
          <Accordion.Header className="services-accordion-header">
            <div className="services-accordion-title">
              <p>
                이용 중인
                <span className="highlight-number">
                  {activeServices.length}
                </span>
                건의 서비스가 있어요
              </p>
              <span className="date-range">{getDateRange(365)}</span>
            </div>
          </Accordion.Header>
          <Accordion.Body className="services-accordion-body">
            <ChartAndCardContainer
              recentServices={recentServices}
              activeServices={activeServices}
              revokedServices={revokedServices}
              activeTab="active"
              showRevoked={showRevoked[1]}
              setShowRevoked={(value) =>
                setShowRevoked((prev) => ({ ...prev, 1: value }))
              }
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="services-accordion-item">
          <Accordion.Header className="services-accordion-header">
            <div className="services-accordion-title">
              <p>
                정보전송 철회를
                <span className="highlight-number">
                  {revokedServices.length}
                </span>
                건 했어요
              </p>
              <span className="date-range">{getDateRange(365)}</span>
            </div>
          </Accordion.Header>
          <Accordion.Body className="services-accordion-body">
            <RevokedCardSlider
              title="전송 철회 내역"
              subTitle="전일 기준 1년 (365일)이전 철회내역 정보조회"
              cardsData={revokedServices}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
