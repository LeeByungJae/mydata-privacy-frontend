import React from "react";
import Button from "react-bootstrap/Button";
import "./CustomButtonStyle.css";

export default function CustomButton({
  variant,
  size,
  label,
  onClick,
  disabled,
  className,
}) {
  // "제3자 제공현황" 또는 "돌아가기"일 경우에만 custom-secondary-btn 클래스 추가
  const additionalClass = className;

  return (
    <Button
      className={`custom-btn ${className}`}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled} // 비활성화 상태 전달
    >
      {label}
    </Button>
  );
}
