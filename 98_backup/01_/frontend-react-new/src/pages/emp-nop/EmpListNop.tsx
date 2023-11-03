import React, { useEffect, useState } from 'react'
import TitleCom from '../../components/common/TitleCom'
import { Link } from 'react-router-dom'
import IEmp from '../../types/IEmp'
import EmpService from '../../services/EmpService';

function EmpListNop() {
    // 변수 정의
    // TODO : 사원 배열 함수
    const [emp, setEmp] = useState<Array<IEmp>>([]);
    // TODO : 검색어 변수
    const [searchEname, setSearchEname] = useState<string>("");

    // 함수 정의
    // TODO : 화면이 뜨자마자 실행되는 이벤트 함수
    useEffect(()=>{
        retrieveEmp();
    },[]);

    // TODO : 검색어 수동바인딩 함수
    const onChangeSearchEname = (e:React.ChangeEvent<HTMLInputElement>) => { 
        setSearchEname(e.target.value);
     }

     // TODO : 전체조회 함수
    const retrieveEmp = () => { 
        EmpService.getAll()
        .then((response:any)=>{
            setEmp(response.data);
            console.log("response", response.data)
        })
        .catch((e:Error)=>{
            console.log(e);
        });
     }

    //  TODO : 검색어 조회 함수
    const findByEname = () => { 
        EmpService.findByEname(searchEname)
        .then((response:any)=> {
            setEmp(response.data);
            console.log("response", response.data)
        })
        .catch((e:Error) => {
            console.log(e);
        })
     }

  return (
    <>
    {/* 제목 start */}
    {/* 공통되는 소스는 컴포넌트같은걸 이용 - 코드 단순화 */}
    <TitleCom title="Emp List" />
    {/* 제목 end */}

    {/* dname start */}
    <div className="row mb-5 justify-content-center">
      {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
      <div className="col-12 w-50 input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by ename"
          value={searchEname}
          onChange={onChangeSearchEname}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByEname}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    {/* dname end */}

    {/* table start */}
    <div className="col-md-12">
      {/* table start */}
      <table className="table">
        {/* 테이블 제목 시작 */}
        <thead className="table-light">
          <tr>
            <th scope="col">Ename</th>
            <th scope="col">Job</th>
            <th scope="col">Manager</th>
            <th scope="col">Hiredate</th>
            <th scope="col">Salary</th>
            <th scope="col">Commission</th>
            <th scope="col">Dno</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {/* 테이블 제목 끝 */}
        {/* 테이블 본문 시작 */}
        <tbody>
          {emp &&
            emp.map((data) => (
              <tr key={data.eno}>
                <td>{data.ename}</td>
                <td>{data.job}</td>
                <td>{data.manager}</td>
                <td>{data.hiredate}</td>
                <td>{data.salary}</td>
                <td>{data.commission}</td>
                <td>{data.dno}</td>
                <td>
                  <Link to={"/emp-nop/" + data.eno}>
                    <span className="badge bg-success">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
        {/* 테이블 본문 끝 */}
      </table>
      {/* table end */}
    </div>
    {/* table end */}
  </>
  )
}

export default EmpListNop