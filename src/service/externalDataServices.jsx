import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const getActiveServices = async () => {
  try {
    const response = await axios.get(`/active_services`, {});
    return response.data;
  } catch (error) {
    console.error("활성화된 서비스 조회 중 오류 발생:", error);
    return [];
  }
};

export const getrevokedServices = async () => {
  try {
    const response = await axios.get(`/revoked_data_providers`, {});
    return response.data;
  } catch (error) {
    console.error("취소된 데이터 제공자 조회 중 오류 발생:", error);
    return [];
  }
};

// 제3자 제공
export const getServiceThirdPartyDetails = async (requestMsgId) => {
  try {
    const response = await axios.get(
      `/service_third_party_details/${requestMsgId}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.error(
      `서비스 ID ${requestMsgId}의 제3자 세부 정보 조회 중 오류 발생:`,
      error
    );
    return [];
  }
};

export const getRecentServices = async () => {
  try {
    const activeServices = await getActiveServices();
    const currentDate = new Date();
    const recentServices = activeServices.filter((service) => {
      const lastConsentDate = new Date(
        `${service.last_consent_date.slice(
          0,
          4
        )}-${service.last_consent_date.slice(
          4,
          6
        )}-${service.last_consent_date.slice(6, 8)}`
      );
      const timeDifference = currentDate.getTime() - lastConsentDate.getTime();
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      return dayDifference <= 30;
    });
    return recentServices;
  } catch (error) {
    console.error("최근 30일 이내의 서비스 조회 중 오류 발생:", error);
    return [];
  }
};

// 전일 30일 기준 철회내역 조회
export const getRecentRevokedServices = async () => {
  try {
    const revokedServices = await getrevokedServices();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // 어제 날짜로 설정

    const recentRevokedServices = revokedServices.filter((service) => {
      // revoked_at을 날짜 객체로 변환
      const revokeDate = new Date(
        `${service.revoked_at.slice(0, 4)}-${service.revoked_at.slice(
          4,
          6
        )}-${service.revoked_at.slice(6, 8)}`
      );
      const timeDifference = currentDate.getTime() - revokeDate.getTime();
      const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
      return dayDifference <= 30;
    });
    return recentRevokedServices;
  } catch (error) {
    console.error("최근 30일 이내의 철회된 서비스 조회 중 오류 발생:", error);
    return [];
  }
};
