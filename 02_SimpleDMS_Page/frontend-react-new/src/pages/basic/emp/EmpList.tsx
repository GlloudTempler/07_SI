import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom'
import { Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import IEmp from '../../../types/basic/IEmp'
import { count } from 'console';
import EmpService from '../../../services/basic/EmpService'

function EmpList() {
    // 변수 정의
    // 사원 배열 변수
    const [emp, setEmp] = useState<Array<IEmp>>([]);
    // 검색어 변수
    const [searchEname, setSearchEname] = useState<string>("");

    // TODO : 공통 변수
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3);
    // TODO : pageSizes : 배열 (셀렉트 박스 사용)
    const pageSizes = [3, 6, 9];

    // 함수 정의
    useEffect(()=>{
        retrieveEmp();
    }, [page, pageSize])

    const retrieveEmp = () => { 
        EmpService.getAll(searchEname, page -1, pageSize)
        .then((response:any)=> {
            const {emp, totalPages} = response.data;
            setEmp(emp);
            setCount(totalPages);
            console.log("response", response.data);
        })
        .catch((e:Error) => {
            console.log(e);
        })
     }

    // 수동 바인딩 함수
    const onChangeSearchEname = (e:React.ChangeEvent<HTMLInputElement>) => {
        const searchEname = e.target.value;
        setSearchEname(searchEname);
    }

    // TODO : handlePageSizeChange : pageSize 값 변경시 실행되는 함수
    // 수동바인딩 : 화면값 -> 변수에 저장
    const handlePageSizeChange = (e:any) => {
        setPageSize(e.target.value);
        setPage(1);
    }

    // TODO : Pagination 수동 바인딩
    const handlePageChange = (event:any, value:number) => {
        setPage(value);
    }

  return (
    <>
        {/* 제목 start */}
        <TitleCom title="Emp List" />
        {/* 제목 end */}

        {/* enmae start */}
        {/* 검색어 입력창 */}
        <div className="row mb-5 justify-content-center">
            {/* w-50 : 크기 조절, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
            <div className="col-12 w-50 input-group mb-3">
                <input
                    type='text'
                    className='form-control'
                    placeholder='Serach by dname'
                    value={searchEname}
                    onChange={onChangeSearchEname}
                />
                <div className='input-group-append'>
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={retrieveEmp}
                    >
                      Search
                    </button>
                </div>
            </div>
        </div>
        {/* enmae end */}

        {/* paging 시작(페이지 번호 컴포넌트) */}
        <div className='mt-3'>
            {"Items per page: "}
            {/* 페이지 size 변경하는 셀렉트 박스 시작 */}
            <select onChange={handlePageSizeChange} value={pageSize}>
                {pageSizes.map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>

            {/* Material UI(구글) 컴포넌트 시작 */}
            {/* count : 총페이지건수(개수), page : 현재페이지번호*/}
            <Pagination
              className='my-3'
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant='outlined'
              shape='rounded'
              onChange={handlePageChange}
            />

        </div>
        {/* paging 끝 */}

        {/* table start(테이블 제목) */}
        <div className='col-md-12'>
            {/* table start (테이블 본론) */}
            <table className='table'>
                <thead className='table-light'>
                    <tr>
                        <th scope='col'>Ename</th>
                        <th scope='col'>Job</th>
                        <th scope='col'>Manager</th>
                        <th scope='col'>Hiredate</th>
                        <th scope='col'>Salary</th>
                        <th scope='col'>Commission</th>
                        <th scope='col'>Dno</th>
                        <th scope='col'>Actions</th>
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
                        <Link to={"/emp/" + data.eno}>
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
  )
}

export default EmpList