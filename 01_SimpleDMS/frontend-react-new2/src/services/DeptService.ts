// DeptService.ts
import http from "../utils/http-common"; // axios 통신
import IDept from "../types/IDept"; // IDept 임포트

// 화살표함수 단축키 : nfn
const getAll = () => { 
    // 조회요청 : .get("/url")
    // 사용법 :  http.get<리턴타입>("url")
    return http.get<Array<IDept>>("/dept");
 }

 /* 상세 조회 (1건 조회) */
 const get = (dno:any) => { 
    return http.get<IDept>(`/dept/${dno}`);
  }

/* 저장 요청 */
const create = (data:IDept) => { 
    //                              >부서데이터
    return http.post<IDept>("/dept",data);
 }

/* 수정 요청 : 기본키, 객체 */
const update = (dno:any, data:IDept) => { 
    return http.put<any>(`/dept/${dno}`, data);
 }

 /* 삭제 요청 : 기본키 */
 const remove = (dno:any) => { 
    return http.delete<any>(`/dept/deletion/${dno}`);
  }

/* 부서명 검색 함수 */
const findByDname = (dname:String) => { 
    return http.get<Array<IDept>>(`/dept?dname=${dname}`);
 }

const DeptService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByDname
}

export default DeptService;