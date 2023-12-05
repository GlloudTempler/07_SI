// 영화진흥위원회 오픈 api 통신 함수 정의
// 전체 조회, 상세 조회만 가능

import axios from "axios";
import ICinema from "../../types/shop/ICinema";

// 영화 진흥 위원회 기본 주소
let baseUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest";
// /boxoffice/searchDailyBoxOfficeList.json

// 발급 받은 api key 변수
let apiKey = "0877210bf2acfc7edb49080d15391f9c";


// 전체 조회
// 요청 필드
// key : 위 인증키 넣기 (필수)
// targetDt : 조회하고자 하는 날짜를 yyyymmdd 형식(필수)
// itemPerPage : 결과 ROW의 개수를 지정
// repNationCd: "K:한국영화" "F" : 외국영화("":전체)
// 변수 사용 : 쿼리 스트링 방식(?변수명=값&변수명2=값2...)
const getAll = (targetDt: string, repNationCd: string, itemPerPage: number) => {
    // 주소 조합 : 기본주소 + 추가주소 + 변수명
    let url = `${baseUrl}//boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${targetDt}&repNationCd=${repNationCd}&itemPerPage=${itemPerPage}`;
    console.log("url", url);

    return axios.get<Array<ICinema>>(url);
}

// 상세 조회 - 영화 상세조회
// 영화 상세 정보 기본주소 ${baseUrl}**기본주소/movie/searchMovieInfo.json**추가주소
// 요청필드(조건) : movieCd ()
const get = (movieCd: string) => {
    // 기본주소 + 추가주소 + 변수명
    let url = `${baseUrl}/movie/searchMovieInfo.json?key=${apiKey}&movieCd=${movieCd}`
    console.log("url", url);

    return axios.get<ICinema>(url);
}

const CinemaService = {
    getAll,
    get
}

export default CinemaService;