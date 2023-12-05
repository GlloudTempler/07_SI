/* 상품 전체조회 페이지 */

import {
  Pagination,
  getListItemSecondaryActionClassesUtilityClass,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import ISimpleProduct from "../../../types/shop/ISimpleProduct";
import SimpleProductService from "../../../services/shop/SimpleProductService";

function SimpleProductList() {
  // 변수 정의
  const [simpleProduct, setSimpleProduct] = useState<Array<ISimpleProduct>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");

  // todo: 공통 페이징 변수 4개
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
  const pageSizes = [3, 6, 9]; // 공통 pageSizes : 배열 (셀렉트 박스 사용)

  // 함수 정의
  useEffect(() => {
    retrieveSimpleProduct();
  }, [page, pageSize]);

  // 전체 조회
  const retrieveSimpleProduct = () => {
    SimpleProductService.getAll(searchTitle, page - 1, pageSize)
      .then((response: any) => {
        const { simpleProduct, totalPages } = response.data;
        setSimpleProduct(simpleProduct);
        setCount(totalPages);
        console.log("response", response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  //   todo: 공통 페이징 함수 2개
  // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
  //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
    setPage(1); // 현재페이지번호 : 1로 강제설정
  };

  //  todo: Pagination 수동 바인딩(공통)
  //  페이지 번호를 누르면 => page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  //   input 태그 수동바인딩
  const onChangeSearchTitle = (e: any) => {
    setSearchTitle(e.target.value); // 화면값 -> 변수저장
  };

  return (
    <>
      {/* 제목 start */}
      <TitleCom title="SimpleProduct List" />
      {/* 제목 end */}

      {/* shop start */}
      <div className="row mb-5 justify-content-center">
        {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
        <div className="col-12 w-50 input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveSimpleProduct}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* dname end */}

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

        {/* count : 총페이지 수, page : 현재페이지 번호 */}
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

      <div className="row">
        {simpleProduct &&
          simpleProduct.map((data) => (
            <div className="ms-5 col-lg-3 col-md-3 mt-5" key={data.spno}>
              <div className="card">
                <img src={data.imgPath} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <h5 className="card-title">₩ {data.unitPrice}</h5>
                  <a
                    href={`/simple-cart/${data.spno}`}
                    className="btn btn-primary"
                  >
                    SimpleProduct Cart
                  </a>
                  <br />
                  <a
                    href={`/simple-product/${data.spno}`}
                    className="btn btn-success mt-2"
                  >
                    SimpleProduct Detail(admin)
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default SimpleProductList;
