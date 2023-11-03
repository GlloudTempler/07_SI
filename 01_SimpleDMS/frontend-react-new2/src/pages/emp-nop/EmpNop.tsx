import React from 'react'
import TitleCom from '../../components/common/TitleCom'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import IEmp from '../../types/IEmp';
import { useEffect } from 'react';
import EmpService from '../../services/EmpService';
import { data } from 'jquery';
import { dark } from '@mui/material/styles/createPalette';

function EmpNop() {
    // TODO : 전체 조회 페이지에서 보내준 기본키 정보 받기
    const { eno } = useParams();
    let navigate = useNavigate();

    // TODO : 변수 정의
    const initialEmp = {
        eno: null,
        ename: "",
        job: "",
        manager: "",
        hiredate: "",
        salary: "",
        commission: "",
        dno: "",
    }

    // TODO : 수정될 사원 객체 변수
    const [emp, setEmp] = useState<IEmp>(initialEmp);
    // TODO : 화면에서 수정 성공/실패 메세지 변수
    const [message, setMessage] = useState<String>("");

    // TODO : 함수 정의
    // 화면이 뜰 때 실행되는 이벤트 함수
    useEffect(()=> {
        if(eno) getEmp(eno);
    },[eno]);

    // TODO : 상세조회
    const getEmp = (eno:string) => { 
        EmpService.get(eno)
        .then((response:any)=>{
            setEmp(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
     }

    // TODO : 입력창 수동 바인딩 함수
    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => { 
        const {name, value} = event.target;
        setEmp({...emp, [name]: value});
     }

    // TODO : 수정 함수
    const updateEmp = () => { 
        EmpService.update(emp.eno, emp)
        .then((response)=>{
            console.log(response.data);
            setMessage("사원정보가 수정되었습니다.")
        })
        .catch((e:Error)=>{
            console.log(e);
        })
     }
    // TODO : 삭제 함수
    const deleteEmp = () => {
        EmpService.remove(emp.eno) 
        .then((response) => {
            console.log(response.data);
            navigate("/emp-nop");
        })
        .catch((e:Error) => {
            console.log(e);
        })
     }

  return (
    <>
    {/* 제목 start */}
    <TitleCom title="EmpNop Detail No Page" />
    {/* 제목 end */}

    <>
      {emp ? (
        <div className="col-6 mx-auto">
          <form>
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="ename" className="col-form-label">
                  Ename
                </label>
              </div>

              <div className="col-9">
                <input
                  type="text"
                  id="ename"
                  required
                  className="form-control"
                  value={emp.ename}
                  onChange={handleInputChange}
                  placeholder="ename"
                  name="ename"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Job
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="job"
                  required
                  className="form-control"
                  value={emp.job}
                  onChange={handleInputChange}
                  placeholder="job"
                  name="job"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Manager
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="manager"
                  required
                  className="form-control"
                  value={emp.manager}
                  onChange={handleInputChange}
                  placeholder="manager"
                  name="manager"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Hiredate
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="hiredate"
                  required
                  className="form-control"
                  value={emp.hiredate}
                  onChange={handleInputChange}
                  placeholder="hiredate"
                  name="hiredate"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Salary
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="salary"
                  required
                  className="form-control"
                  value={emp.salary}
                  onChange={handleInputChange}
                  placeholder="salary"
                  name="salary"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Commission
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="commission"
                  required
                  className="form-control"
                  value={emp.commission?? ""}
                  onChange={handleInputChange}
                  placeholder="commission"
                  name="commission"
                />
              </div>
            </div>

            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Dno
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="dno"
                  required
                  className="form-control"
                  value={emp.dno}
                  onChange={handleInputChange}
                  placeholder="dno"
                  name="dno"
                />
              </div>
            </div>
          </form>

          <div className="row g-3 mt-3 mb-3">
            <button onClick={deleteEmp} className="btn btn-outline-danger ms-3 col">
              Delete
            </button>

            <button
              type="submit"
              onClick={updateEmp}
              className="btn btn-outline-success ms-2 col"
            >
              Update
            </button>
          </div>

          <p>{message}</p>
        </div>
      ) : (
        <div className="col-6 mx-auto">
          <br />
          <p>Please click on a EmpNop...</p>
        </div>
      )}
    </>
  </>
  )
}

export default EmpNop