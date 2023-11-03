import React, { useState } from "react";
import TitleCom from "../../components/common/TitleCom";
import IEmp from "../../types/IEmp";
import EmpService from "../../services/EmpService";

function AddEmpNop() {
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

    // TODO : 새 사원 객체 변수
    const [emp, setEmp] = useState<IEmp>(initialEmp);
    const [submitted, setSubmitted] = useState<Boolean>(false);

    // TODO : 함수 정의
    const newEmp = () => { 
        setEmp(initialEmp);
        setSubmitted(false);
     }

    const handleInputChange = (event:any) => { 
        const {name, value} = event.target;
        setEmp({...emp, [name]: value});
     }

    // TODO : 저장함수
    const saveEmp = () => { 
        var data = {
            ename: emp.ename,
            job: emp.job,
            manager: emp.manager,
            hiredate: emp.hiredate,
            salary: emp.salary,
            commission: emp.commission,
            dno: emp.dno
        }
        EmpService.create(data)
        .then((response:any)=> {
            setEmp(response.data);
            setSubmitted(true);
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
     }

  return (
    <div className="row">
      {/* submitted의 결과에 따라 화면이 달라짐 */}
      {submitted ? (
        /* 저장버튼 클릭하면 아래 화면이 보임 */
        <div className="col-6 mx-auto">
          <h4>You submitted successfully!</h4>
          {/* add 버튼 = 다시 새로운 부서저장 페이지로 이동 */}
          <button className="btn btn-success" onClick={newEmp}>
            Add
          </button>
        </div>
      ) : (
        <>
          {/* 제목 start */}
          <TitleCom title="Add Emp No Page" />
          {/* 제목 end */}

          {/* 사원명 입력창 시작 */}
          <div className="col-6 mx-auto">
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
            {/* 사원명 입력창 끝 */}

            {/* 직위 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="job" className="col-form-label">
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
            {/* 직위 입력창 끝 */}

            {/* 매니저 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="manager" className="col-form-label">
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
            {/* 매니저 입력창 끝 */}

            {/* 입사일 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="hiredate" className="col-form-label">
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
            {/* 입사일 입력창 끝 */}

            {/* 월급 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="salary" className="col-form-label">
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
            {/* 월급 입력창 끝 */}

            {/* 성과급 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="commission" className="col-form-label">
                  Commission
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="commission"
                  required
                  className="form-control"
                  value={emp.commission}
                  onChange={handleInputChange}
                  placeholder="commission"
                  name="commission"
                />
              </div>
            </div>
            {/* 성과급 입력창 끝 */}

            {/* 성과급 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="dno" className="col-form-label">
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
            {/* 월급 입력창 끝 */}

            {/* 저장버튼 시작 */}
            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={saveEmp}
                className="btn btn-outline-primary ms-2 col"
              >
                Submit
              </button>
            </div>
            {/* 저장버튼 끝 */}
          </div>
        </>
      )}
    </div>
  );
}

export default AddEmpNop;
