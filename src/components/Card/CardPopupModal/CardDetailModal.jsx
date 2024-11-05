import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./CardDetailModalStyle.css";
import CheckOnIcon from "../../../assets/check-on.svg";
import CheckOffIcon from "../../../assets/check-off.svg";
import LiIcon from "../../../assets/li-icon.svg";
import { formatDate } from "../../../utils/utils";
import CardCarousel from "./CardCarousel";
import CustomButton from "../../common/button/CustomButton";

export default function CardDetailModal({ card, onClose, show, serviceTag }) {
  const { title, last_consent_date, data_providers = [], service_code } = card;

  const [isChecked, setIsChecked] = useState(null); // 기본 상태: 체크되지 않음
  const [checkedStates, setCheckedStates] = useState({});
  const [submittingStates, setSubmittingStates] = useState({});
  const [completedStates, setCompletedStates] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateStorageKey = (prefix, serviceCode, provider) => {
    return `${prefix}_${serviceCode}_${provider}`;
  };

  useEffect(() => {
    const loadStates = (prefix) => {
      return card.data_providers.reduce((acc, provider) => {
        const key = generateStorageKey(
          prefix,
          card.service_code,
          provider.provider
        );
        const value = localStorage.getItem(key);
        acc[provider.provider] = value ? JSON.parse(value) : false;
        return acc;
      }, {});
    };

    setCheckedStates(loadStates("isChecked"));
    setSubmittingStates(loadStates("isSubmitting"));
    setCompletedStates(loadStates("isCompleted"));

    // 초기 체크 상태 설정
    const provider = card.data_providers[currentIndex]?.provider;
    if (loadStates("isCompleted")[provider]) {
      setIsChecked(true); // 처리 완료된 상태에서는 "동의함" 체크
    } else {
      setIsChecked(null); // 기본 상태에서는 체크되지 않음
    }
  }, [card.service_code, card.data_providers, currentIndex]);

  // const handleCheckChange = () => {
  //   const provider = card.data_providers[currentIndex].provider;
  //   const newChecked = !isChecked;
  //   setIsChecked(newChecked);
  //   const key = generateStorageKey("isChecked", card.service_code, provider);
  //   localStorage.setItem(key, JSON.stringify(newChecked));
  // };

  const handleCheckChange = (agree) => {
    setIsChecked(agree);
    const provider = card.data_providers[currentIndex]?.provider;
    const key = generateStorageKey("isChecked", card.service_code, provider);
    localStorage.setItem(key, JSON.stringify(agree));
  };

  const handleSubmit = () => {
    const provider = card.data_providers[currentIndex].provider;
    setSubmittingStates((prev) => ({ ...prev, [provider]: true }));
    const submittingKey = generateStorageKey(
      "isSubmitting",
      card.service_code,
      provider
    );
    localStorage.setItem(submittingKey, true);
  };

  const handleOnClose = () => {
    const updatedCompletedStates = { ...completedStates };
    Object.keys(submittingStates).forEach((provider) => {
      if (submittingStates[provider]) {
        updatedCompletedStates[provider] = true; // 철회 완료 상태로 설정
        localStorage.setItem(
          generateStorageKey("isCompleted", card.service_code, provider),
          true
        );
        localStorage.setItem(
          generateStorageKey("isSubmitting", card.service_code, provider),
          false
        );
      }
    });
    setCompletedStates(updatedCompletedStates);

    // submittingStates를 초기화하지만 completedStates는 유지
    setSubmittingStates({}); // 철회 요청 중 상태 초기화
    onClose();
  };

  // const handleOnClose = () => {
  //   const updatedCompletedStates = { ...completedStates };
  //   Object.keys(submittingStates).forEach((provider) => {
  //     if (submittingStates[provider]) {
  //       updatedCompletedStates[provider] = true;
  //       localStorage.setItem(
  //         generateStorageKey("isCompleted", card.service_code, provider),
  //         true
  //       );
  //       localStorage.setItem(
  //         generateStorageKey("isSubmitting", card.service_code, provider),
  //         false
  //       );
  //     }
  //   });
  //   setCompletedStates(updatedCompletedStates);
  //   onClose();
  // };
  console.log("card.service_code", card.service_code);
  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p>{title}</p>
          <span>- 전송요구 동의내역 -</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-service-info-detail">
          <div className="detail-info">
            <p>정보수신자</p>
            <span className="modal-content-title">
              {data_providers[currentIndex]?.provider}
            </span>
          </div>
          <div className="detail-info">
            <p>동의한 일자</p>
            <span className="modal-content-title">
              {formatDate(last_consent_date)}
            </span>
          </div>
        </div>

        <CardCarousel
          providers={card.data_providers}
          onSlideChange={setCurrentIndex}
          currentIndex={currentIndex}
        />

        {!service_code.startsWith("H1") && !service_code.startsWith("E1") && (
          <section className="withdraw-container">
            <div className="modal-divider"></div>
            {completedStates[data_providers[currentIndex]?.provider] && (
              <div className="withdraw-complete-container">
                <div className="withdraw-complete-stamp">철회요청완료</div>
              </div>
            )}

            <div className="withdraw-content">
              <p className="withdraw-title">
                전송요구 철회하기 ({data_providers[currentIndex]?.provider})
              </p>
              <section className="withdraw-sub-title">
                <p>이용안내</p>
                <ul className="useInfo-list">
                  <li>본 플랫폼에서는 전송요구 철회 신청을 지원합니다.</li>
                  <li className="no-disc">
                    <span className="withdraw-alert">
                      철회 신청은 데이터 삭제를 의미하지 않으며, 데이터 삭제는
                      정보수신자 플랫폼을 통해 별도로 진행해야 합니다.
                    </span>
                  </li>
                </ul>
              </section>
              <section className="withdraw-sub-title">
                <p>전송요구 철회</p>
                <div className="withdraw-check-list">
                  <div className="withdraw-check-item">
                    <ul className="userInfo-list">
                      <li className="no-disc">
                        <span className="consent-required">(필수)</span>
                        <span className="consent-description">
                          「전송요구 철회」에 동의하며 안내사항을
                          확인하였습니다.
                        </span>
                      </li>
                    </ul>
                    <div className="consent-option-container">
                      <div className="consent-options">
                        <div
                          className="consent-option"
                          onClick={() => handleCheckChange(true)}
                        >
                          <input
                            type="radio"
                            name="consent"
                            value="agree"
                            checked={isChecked === true}
                            // onChange={() => handleCheckChange(true)}
                            className="consent-radio consent-agree"
                          />
                          <span className="consent-label">동의함</span>
                        </div>
                        <div
                          className="consent-option"
                          onClick={() => handleCheckChange(false)}
                        >
                          <input
                            type="radio"
                            name="consent"
                            value="disagree"
                            checked={isChecked === false}
                            // onChange={() => handleCheckChange(false)}
                            className="consent-radio consent-disagree"
                          />
                          <span className="consent-label">동의안함</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="btn-container">
          <CustomButton
            // className="custom-secondary-btn"
            variant="secondary"
            label="닫기"
            onClick={handleOnClose}
          >
            닫기
          </CustomButton>
          {serviceTag !== "금융" && serviceTag !== "공공" && (
            <CustomButton
              variant="primary"
              label={
                submittingStates[data_providers[currentIndex]?.provider]
                  ? "철회요청중..."
                  : "철회하기"
              }
              onClick={handleSubmit}
              disabled={
                completedStates[data_providers[currentIndex]?.provider] ||
                !isChecked ||
                submittingStates[data_providers[currentIndex]?.provider]
              }
            />
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}
