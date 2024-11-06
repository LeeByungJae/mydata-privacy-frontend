import axios from "axios";
import { useDispatch } from 'react-redux'
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
export const getAuthLogin = async (id) => {
  try {
    const requestBody = {id}
    const response = await axios.post(`/auth/login`, requestBody);
    const {data} = response
    const {resultVO} = data

   return resultVO;
  } catch (error) {
    console.error("활성화된 서비스 조회 중 오류 발생:", error);
    return [];
  }
};

export const postRetract = async (requestBody) => {
  try {
    const response = await axios.post(`/api/v1/privacy/retract`, requestBody);
    const {data} = response
    return data;
  } catch (error) {
    console.error("활성화된 서비스 조회 중 오류 발생:", error);
    return [];
  }
};

export const getActiveServices = async (id) => {
  try {
    const response = await axios.get(`/api/v1/privacy/requestinfo/${id}`);
    const {data} = response    
    const {results} = data
    const {transferRequestDtos} = results
    return transferRequestDtos;
  } catch (error) {
    console.error("활성화된 서비스 조회 중 오류 발생:", error);
    return [];
  }
};

export const getrevokedServices = async (id) => {
  try {
    const response = await axios.get(`/api/v1/privacy/revokedinfo/${id}`);
    const {data} = response
    const {results} = data
    const {transferRequestDtos} = results
    return transferRequestDtos;
  } catch (error) {
    console.error("취소된 데이터 제공자 조회 중 오류 발생:", error);
    return [];
  }
};

// 제3자 제공
export const getServiceThirdPartyDetails = async (rsognCd, trsmRqustfId) => {
  try {
    const param = {
      rsognCd,
      trsmRqustfId
    }
    const response = await axios.get(
      `/api/v1/privacy/third-serve`, {param}
    );
    const {data} = response
    const {results} = data
    return results;
  } catch (error) {
    console.error(
      `서비스 ID ${requestMsgId}의 제3자 세부 정보 조회 중 오류 발생:`,
      error
    );
    return [];
  }
};

export const getRecentServices = async (id) => {
  try {
    const activeServices = await getActiveServices(id);
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
export const getRecentRevokedServices = async (id) => {
  try {
    const revokedServices = await getrevokedServices(id);
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

