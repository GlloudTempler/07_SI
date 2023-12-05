// axios 공통 함수 : 벡엔드 연동


import IProduct from "../../types/shop/IProduct";
import http from "../../utils/http-common";

// spno?: any | null,
// codeId: number,
// title: string,
// imgPath: string,
// unitPrice: number,
// useYn: string
// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지 당 개수))
const getAll = (pname:string, page:number, size:number) => {
  return http.get<Array<IProduct>>(`/shop/product?pname=${pname}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (pno:any) => {
  return http.get<IProduct>(`/shop/product/${pno}`);
};

// 저장 함수
const create = (data:IProduct) => {
  return http.post<IProduct>("/shop/product", data);
};

// 수정 함수
const update = (pno:any, data:IProduct) => {
  return http.put<IProduct>(`/shop/product/${pno}`, data);
};

// 삭제 함수
const remove = (pno:any) => {
  return http.delete<any>(`/shop/product/deletion/${pno}`);
};

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ProductService;