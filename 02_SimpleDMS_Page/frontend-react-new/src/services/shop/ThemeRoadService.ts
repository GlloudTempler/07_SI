// 공공 데이터 포털 API 함수

import axios from "axios";
import IThemeRoad from "../../types/shop/IThemaRoad";

// 공공데이터 포털 : 부산 테마거리 음식점 기본주소
let baseUrl = "https://api.odcloud.kr/api";

// 인증키 변수
let apiKey ="Wd5qsmJSIp1fcm3QZIP0FWUX8W7q4W6f5jLcRmwPinDMvpmDjc3zy%2FD0ksn7L2jhf0ykDOI32rmK6rhKwU5WFA%3D%3D";

// 전체 조회
// page: 현재 페이지 번호
// perpage: 1페이지당 개수
const getAll = (page: number, perPage: number) => {
    // url 조합 : 기본주소 + 추가주소 + 변수명(뭐리스트링)
    let url = `${baseUrl}/15096718/v1/uddi:0a31f303-432c-4993-97d2-81537862521b?page=${page}&perPage=${perPage}&serviceKey=${apiKey}`;
    console.log(url);

    return axios.get<Array<IThemeRoad>>(url);
}

const ThemeRoadService = {
    getAll
}

export default ThemeRoadService;