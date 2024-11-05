import React from "react";
import "./Tap.css";

function Tabs({ activeTab, onTabClick }) {
  const tabs = ["recent", "active"]; // 탭 키 설정

  // 탭 이름 맵핑 (UI에 보여질 텍스트)
  const tabLabels = {
    recent: "최근 가입 서비스",
    active: "전체 이용 서비스",
  };

  return (
    <div className="tap_container">
      <div className="taps">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab ? "tap_item tap_click_item" : "tap_item"
            }
            onClick={() => onTabClick(tab)} // 탭 클릭 시 전달받은 함수 호출
          >
            <p>{tabLabels[tab]}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
