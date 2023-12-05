// CustomerService.ts : axios 공통 crud 함수
import http from "../../../utils/http-common";
import ICodeCategory from './../../../types/admin/code/ICodeCategory';

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
// 셀렉트박스 : (fullName)   입력창 : 이름 like 검색
// 셀렉트박스 : (email) 입력창      : 이메일 like 검색
//   변수 : searchSelect (fullName, email)
//   변수 : searchKeyword : 검색어
const getAll = (categoryName:string, page:number, size:number) => {
    return http.get<Array<ICodeCategory>>(`/admin/code-category?categoryName=${categoryName}&page=${page}&size=${size}`);
  };

  // 전체 조회: 페이징 없는 함수
  const getAllNoPage = () => {
    return http.get<Array<ICodeCategory>>("/admin/code-category/all");
  }
  
  // 상세 조회
  const get = (categoryId:any) => {
    return http.get<ICodeCategory>(`/admin/code-category/${categoryId}`);
  };
  
  // 저장함수
  const create = (data:ICodeCategory) => {
    return http.post<ICodeCategory>("/admin/code-category", data);
  };
  // 수정함수
  const update = (categoryId:any, data:ICodeCategory) => {
    return http.put<any>(`/admin/code-category/${categoryId}`, data);
  };

  
  const CodeCategoryService = {
    getAll,
    get,
    create,
    update,
    getAllNoPage
  };
  
  export default CodeCategoryService;
  