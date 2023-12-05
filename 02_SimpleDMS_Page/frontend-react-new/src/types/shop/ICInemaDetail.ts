export default interface ICinemaDetail {
    // 영화 진흥위원회 응답필드 - 오픈 api 소스 : 화면에 출력

    movieCd:string,        // 영화코드를 출력합니다.
    movieNm: string,       // 영화명(국문)을 출력합니다.
    prdtYear: string,      // 제작연도를 출력합니다.
    showTm: string,        // 상영시간을 출력합니다.
    openDt: string,        // 개봉연도를 출력합니다.
    directors: Array<any>, // 감독을 나타냅니다.
    actors: Array<any>,    // 배우를 나타냅니다.
    prdtStatNm: string,    // 제작상태명을 출력합니다.
}