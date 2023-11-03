import IEmp from "../types/IEmp";
import http from "../utils/http-common";

const getAll = () => { 
    return http.get<Array<IEmp>>("/emp");
 }

const get = (eno:any) => { 
    return http.get<IEmp>(`/emp/${eno}`);
 }

const create = (data:IEmp) => { 
    return http.post<IEmp>("/emp",data);
 }

const update = (eno:any, data:IEmp) => { 
    return http.put<any>(`/emp/${eno}`,data);
 }

const remove = (eno:any) => { 
    return http.delete<any>(`/emp/deletion/${eno}`);
 }   

const findByEname = (ename:String) => { 
    return http.get<Array<IEmp>>(`/emp?ename=${ename}`);
 }

const EmpService = { 
    getAll,
    get,
    create,
    update,
    remove,
    findByEname
}

export default EmpService;