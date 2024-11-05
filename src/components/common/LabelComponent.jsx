import SmallDownIcon from "../../assets/small-down.svg";
import "./LabelComponent.css";
export default function Label() {
  return (
    <div className="label-conatiner">
      <p>홈</p>
      <span>/</span>
      <div className="label-title">
        <p className>마이데이터 관리</p>
        <img src={SmallDownIcon} alt="Down" />
      </div>
    </div>
  );
}
