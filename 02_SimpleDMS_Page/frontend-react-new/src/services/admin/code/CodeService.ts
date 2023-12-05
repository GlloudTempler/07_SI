// CustomerService.ts : axios 공통 crud 함수
import http from "../../../utils/http-common";
import ICode from './../../../types/admin/code/ICode';

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
// 셀렉트박스 : (fullName)   입력창 : 이름 like 검색
// 셀렉트박스 : (email) 입력창      : 이메일 like 검색
//   변수 : searchSelect (fullName, email)
//   변수 : searchKeyword : 검색어
const getAll = (codeName:string, page:number, size:number) => {
    return http.get<Array<ICode>>(`/admin/code?codeName=${codeName}&page=${page}&size=${size}`);
  };

  // 전체 조회: 페이징 없는 함수
  const getAllNoPage = () => {
    return http.get<Array<ICode>>("/admin/code/all");
  }
  
  // 상세 조회
  const get = (codeId:any) => {
    return http.get<ICode>(`/admin/code/${codeId}`);
  };
  
  // 저장함수
  const create = (data:ICode) => {
    return http.post<ICode>("/admin/code", data);
  };
  // 수정함수
  const update = (codeId:any, data:ICode) => {
    return http.put<any>(`/admin/code/${codeId}`, data);
  };

  

  
  const CodeService = {
    getAll,
    get,
    create,
    update,
    getAllNoPage
  };
  
  export default CodeService;
  