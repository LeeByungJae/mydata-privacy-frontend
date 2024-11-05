// utils.js

// 서비스 코드에 따른 태그를 반환하는 함수
export const getServiceTag = (serviceCode) => {
  if (!serviceCode) return "기타";
  const prefix = serviceCode.substring(0, 2);
  switch (prefix) {
    case "B1":
      return "통신";
    case "C1":
      return "의료";
    case "H1":
      return "금융";
    case "E1":
      return "공공";
    default:
      return "기타";
  }
};

export const formatDate = (dateString) => {
  // dateString이 유효한지 확인
  if (!dateString || dateString.length !== 8) return "날짜 정보 없음";

  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}.${month}.${day}`;
};

// 컬러 매핑 함수
// 컬러 매핑 함수
const getServiceColor = (categoryName) => {
  // 해시 기호를 제거하고 비교

  switch (categoryName) {
    case "통신":
      return "#fdb827";
    case "의료":
      return "#82ca9d";
    case "금융":
      return "#3275fd";
    case "공공":
      return "#ff6361";
    default:
      return "#999999"; // 기타
  }
};

// 서비스 데이터를 차트에서 사용할 수 있는 데이터 형식으로 변환하는 함수
export const convertDataToChartData = (services) => {
  const chartData = services.reduce((acc, service) => {
    // 서비스 코드의 앞 두 글자를 사용해 카테고리 태그를 가져오기
    const categoryName = getServiceTag(service.service_code);
    const existingCategory = acc.find((item) => item.name === categoryName);

    if (existingCategory) {
      existingCategory.value += 1; // 이미 있는 카테고리면 수량을 증가
    } else {
      const color = getServiceColor(categoryName);
      console.log("카테고리 색상:", color); // 색상 확인
      acc.push({
        name: categoryName,
        value: 1,
        color: color, // 카테고리 색상 사용
      });
    }
    return acc;
  }, []);

  return chartData;
};
