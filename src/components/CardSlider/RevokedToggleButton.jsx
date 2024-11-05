import React from "react";
import "./RevokedToggleButtonStyle.css";

export default function RevokedToggleButton({ showRevoked, setShowRevoked }) {
  return (
    <div className="revoked-toggle-button-container">
      <button
        className="revoked-toggle-button"
        onClick={() => setShowRevoked(!showRevoked)}
      >
        <p>
          {" "}
          {showRevoked ? "철회 내역 닫기" : ' " 철회 내역도 궁금하신가요? "'}
        </p>
      </button>
    </div>
  );
}
