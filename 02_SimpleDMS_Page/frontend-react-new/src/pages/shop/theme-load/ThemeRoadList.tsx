import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import IThemeRoad from "../../../types/shop/IThemaRoad";
import ThemeRoadService from "../../../services/shop/ThemeRoadService";

function ThemeRoadList() {
  // 변수 정의
  // 부서 배열 변수
  const [themeRoad, setThemeRoad] = useState<Array<IThemeRoad>>([]);

  // TODO : 공통 변수 : page(현재페이지), count(총페이지건수), pageSize(3,6,9배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당 개수
  // TODO : pageSizes : 배열(셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // 함수 정의
  // TODO : 함수정의
  // TODO: 1) 컴포넌트가 mounted 될때 한번만 실행됨 : useEffect(() => {},[])
  // TODO: 2) 컴포넌트의 변수값이 별할 때 실행됨 : useEffect(() => {실행문},[감시변수])
  useEffect(() => {
    retrieveThemeRoad(); // 전체조회
  }, [page, pageSize]);

  // 전체조회 함수
  const retrieveThemeRoad = () => {
    ThemeRoadService.getAll(page - 1, pageSize) // 백엔드 전체조회 요청
      .then((response: any) => {
        // todo : 공공api 결과 값 저장
        const { data, perPage, totalCount } = response.data;
        // 총페이지 수
        const totalPages = Math.ceil(totalCount/perPage);
        setThemeRoad(data);
        setCount(totalPages);
        // 로그 출력
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // TODO : handlePageSizeChange : pageSize 값 변경시 실행되는 함수
  // 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (e: any) => {
    setPageSize(e.target.value); // 한 페이지 당 개수저장(3,6,9)
    setPage(1); // 현재 페이지 번호 : 1로 강제 지정
  };

  // TODO : Pagination 수동 바인딩
  // 페이지 번호를 누르면 => page변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지 번호
    setPage(value);
  };

  return (
    <>
      {/* 제목 start */}
      <TitleCom title="ThemeRoad List" />
      {/* 제목 end */}

      {/* paging 시작 */}
      <div className="mt-3">
        {"Items per Page: "}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <Pagination
          className="my-3"
          count={count}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
      {/* paging 끝 */}

      {/* table start */}
      <div className="col-md-12">
        {/* table start */}
        <table className="table">
          <thead className="table-light">
            <tr className="text-center">
              <th scope="col">식당(ID)</th>
              <th scope="col">식당명</th>
              <th scope="col">지역명</th>
              <th scope="col">식당이미지(ID)</th>
              <th scope="col">식당이미지(URL)</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {themeRoad &&
              themeRoad.map((data, index) => (
                <tr key={index} className="text-center">
                  <td>{data["식당(ID)"]}</td>
                  <td>{data["식당명"]}</td>
                  <td>{data["지역명"]}</td>
                  <td>{data["식당이미지(ID)"]}</td>
                  <td>
                    <img
                      src={data["식당이미지(URL)"]}
                      width="50vw"
                      height="30vh"
                    />{" "}
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

export default ThemeRoadList;
