import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TitleCom from "../../../components/common/TitleCom";
import ICinema from "../../../types/shop/ICinema";
import CinemaService from "../../../services/shop/CinemaService";

// 달력 이미지 경로
import imgCalendar from"../../../assets/img/calender.png";

function CinemaList() {
  // todo : 변수 정의
  // cinema 배열 변수
  const [cinema, setCinema] = useState<Array<ICinema>>([]);
  // nationcode (K: 한국 / F: 외국) 검색어 변수
  const [searchNationCode, setSearchNationCode] = useState<string>("");

  // TODO : 공통 변수 : pageSize(3,6,9배열)
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당 개수
  // TODO : pageSizes : 배열(셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // todo : 달력 변수 정의
  // useRef() : html태그에 직접접근하게 하는 함수
  // datepicker.current.value : 그 html 태그의 값
  const datepicker = useRef<any>();

  // todo : 함수 정의

  //
  useEffect(() => {
    // todo : 달력(jquery-ui) 초기화
    $("#datepicker").datepicker({
      dateFormat: "yymmdd",
      showOn: "button", // 버튼을 클릭하면 달력보이기
      buttonImage: imgCalendar, // 버튼에 달력 이미지 보이기
    });
    retrieveCinema();
  }, [pageSize]);

  // 전체조회 함수
  const retrieveCinema = () => {
    // getAll - (현재날짜, 영화구분, 페이지 크기)
    CinemaService.getAll(datepicker.current.value, searchNationCode, pageSize) // 백엔드 전체조회 요청
      .then((response: any) => {
        const { dailyBoxOfficeList } = response.data.boxOfficeResult;
        setCinema(dailyBoxOfficeList);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 수동 바인딩 함수
  const onChangeSearchNationCode = (e: any) => {
    setSearchNationCode(e.target.value);
  };

  // TODO : handlePageSizeChange : pageSize 값 변경시 실행되는 함수
  // 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (e: any) => {
    setPageSize(e.target.value); // 한 페이지 당 개수저장(3,6,9)
  };

  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Cinema List" />
      {/* 제목 end */}

      <div className="row mb-3"></div>

      {/* rankOldAndNew start */}
      <div className="row mb-1">
        <div className="col-1">
          <label htmlFor="inputPassword6" className="col-form-label">
            영화구분 :
          </label>
        </div>

        <div className="col-2">
          <select
            className="form-select"
            onChange={onChangeSearchNationCode}
            value={searchNationCode}
          >
            <option key="all" value="">
              전체
            </option>
            <option key="korea" value="K">
              국내영화
            </option>
            <option key="foreign" value="F">
              외국영화
            </option>
          </select>
        </div>

        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="col-auto w-25 input-group mb-3">
          <div className="input-group">
            <span className="input-group-addon me-2">
              <label htmlFor="inputPassword6" className="col-form-label">
                달력 :
              </label>
            </span>
            <input
              type="text"
              id="datepicker"
              className="form-control"
              disabled
              ref={datepicker}
            />
            <button className="btn btn-primary ms-5" onClick={retrieveCinema}>
              조회
            </button>
          </div>
        </div>
      </div>
      {/* rankOldAndNew end */}
      {/* paging 시작 */}
      <div className="mb-1">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      {/* paging 끝 */}
      {/* table start */}
      <div className="col-md-12">
        {/* table start */}
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">순위</th>
              <th scope="col">영화명</th>
              <th scope="col">개봉일</th>
              <th scope="col">누적관객수</th>
              <th scope="col">상영관수</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cinema &&
              cinema.map((data) => (
                <tr key={data.movieCd}>
                  <td>{data.rank}</td>
                  <td>
                    {data.movieNm}
                    <span className="badge rounded-pill text-bg-warning ms-2">
                      {data.rankOldAndNew == "NEW" ? data.rankOldAndNew : ""}
                    </span>
                  </td>
                  <td>{data.openDt}</td>
                  <td>{parseInt(data.audiAcc).toLocaleString()}</td>
                  <td>{parseInt(data.scrnCnt).toLocaleString()}</td>
                  <td>
                    <Link to={"/cinema/" + data.movieCd}>
                      <span className="badge bg-success">Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* table end */}
      </div>
      {/* table end */}
    </>
  );
}

export default CinemaList;
