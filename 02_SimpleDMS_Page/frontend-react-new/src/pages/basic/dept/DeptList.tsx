// DeptList.tsx
// 전체조회페이지 + 페이징

import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { Link } from "react-router-dom";
import IDept from "../../../types/basic/IDept";
import DeptService from "../../../services/basic/DeptService";
import { event } from "jquery";

function DeptList() {
  // 변수 정의
  // 부서 배열 변수
  const [dept, setDept] = useState<Array<IDept>>([]);
  // 검색어 변수
  const [searchDname, setSearchDname] = useState<string>("");

  // TODO : 공통 변수 : page(현재페이지), count(총페이지건수), pageSize(3,6,9배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당 개수
  // TODO : pageSizes : 배열(셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];

  // TODO : 함수정의
  // TODO: 1) 컴포넌트가 mounted 될때 한번만 실행됨 : useEffect(() => {},[])
  // TODO: 2) 컴포넌트의 변수값이 별할 때 실행됨 : useEffect(() => {실행문},[감시변수])
  useEffect(() => {
    retrieveDept(); // 전체조회
  }, [page, pageSize]);

  // 전체조회 함수
  const retrieveDept = () => {
    // 백엔드 매개변수 전송 : + 현재페이지(page), 1페이지당 개수(pagesize)
    DeptService.getAll(searchDname, page -1, pageSize) // 백엔드 전체조회 요청
    .then((response:any)=> {
      // 백엔드 성공시 자동 실행
      // es6 문법 : 객체 분해 할당
      // const dept = response.data.dept; // 부서배열
      // const totalPages = response.data.totalPages; // 전체페이지수
      const { dept, totalPages } = response.data;
      // dept 저장
      setDept(dept);
      setCount(totalPages);
      // 로그 출력
      console.log("response", response.data);
    })
    .catch((e:Error)=> {
      console.log(e);
    })
  }

  // 수동 바인딩 함수
  const onChangeSearchDname = (e:React.ChangeEvent<HTMLInputElement>) => { 
    const searchDname = e.target.value;
    setSearchDname(searchDname);
   }
  
  // TODO : handlePageSizeChange : pageSize 값 변경시 실행되는 함수
  // 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (e:any) => { 
    setPageSize(e.target.value); // 한 페이지 당 개수저장(3,6,9)
    setPage(1); // 현재 페이지 번호 : 1로 강제 지정
   }
  
  // TODO : Pagination 수동 바인딩
  // 페이지 번호를 누르면 => page변수에 값 저장
  const handlePageChange = (event:any, value:number) => { 
    // value == 화면의 페이지 번호
    setPage(value);
   }

  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Dept List" />
      {/* 제목 end */}

      {/* dname start */}
      {/* 검색어 입력창 */}
      <div className="row mb-5 justify-content-center">
        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by dname"
            value={searchDname}
            onChange={onChangeSearchDname}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveDept}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* dname end */}

      {/* paging 시작(페이지 번호 컴포넌트) */}
      <div className="mt-3">
        {"Items per Page: "}
        {/* 페이지 size 변경하는 셀렉트 박스 시작 */}
        <select onChange={handlePageSizeChange} value={pageSize}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* Material UI(구글) 컴포넌트 시작 */}
        {/* count : 총페이지건수(개수), page : 현재페이지번호 */}
        {/* 사용법 : count = {1페이지당 개수}, page={현재페이지 번호} */}
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
        
      {/* 컴포넌트 끝 */}
      {/* paging 끝 */}

      {/* table start(테이블 제복) */}
      <div className="col-md-12">
        {/* table start (테이블 본문) */}
        <table className="table">
          <thead className="table-light">
            <tr>
              <th scope="col">Dname</th>
              <th scope="col">Loc</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dept &&
              dept.map((data) => (
                <tr key={data.dno}>
                  <td>{data.dname}</td>
                  <td>{data.loc}</td>
                  <td>
                    <Link to={"/dept/" + data.dno}>
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

export default DeptList;