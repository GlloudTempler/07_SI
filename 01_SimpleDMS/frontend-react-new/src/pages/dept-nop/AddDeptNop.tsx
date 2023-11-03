import React, { useState } from "react";
import TitleCom from "../../components/common/TitleCom";
import IDept from "../../types/IDept";
import DeptService from "../../services/DeptService";

function AddDeptNop() {
    // TODO : 변수 정의
    const initialDept = {
        dno: null,
        dname: "",
        loc: ""
    }
    
    // TODO : 새부서 객체 변수
    const [dept, setDept] = useState<IDept>(initialDept);
    // TODO : 저장하면 true, 아니면 false 인 변수(값에따라 화면이 바뀜)
    const [submitted, setSubmitted] = useState<Boolean>(false);
    

    // TODO : 함수 정의
    // todo : 새로운 폼(form)을 보여주는 함수
    const newDept = () => {
        // 새폼 == 객체초기화, submitted 변수 초기화(false)
        setDept(initialDept); // 객체초기화
        setSubmitted(false);
    }
    // TODO : 각각의 입력창 수동바인딩
    const handleInputChange = (event:any) => { 
        const {name, value} = event.target; // 화면값 [이름]
        // 화면값 -> Dept 객체의 속성에 저장
        setDept({...dept, [name]: value});
     }

    // TODO : 저장 함수
    const saveDept = () => { 
        // 임시 부서 변수(저장될 객체)
        var data = {
            dname: dept.dname,
            loc: dept.loc
        }
        // 저장 함수 호출
        DeptService.create(data) // 백엔드로 저장
        .then((response:any)=>{
            // 객체 저장
            setDept(response.data);
            // 저장 성공 유무 -> submitted 변수에 저장
            setSubmitted(true); // 화면 변경

            console.log(response.data);
        })
        .catch((e:Error)=>{
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
          <button className="btn btn-success" onClick={newDept}>
            Add
          </button>
        </div>
      ) : (
        <>
          {/* 제목 start */}
          <TitleCom title="Add Dept No Page" />
          {/* 제목 end */}
          
          {/* 부서명 입력창 시작 */}
          <div className="col-6 mx-auto">
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="dname" className="col-form-label">
                  Dname
                </label>
              </div>

              <div className="col-9">
                <input
                  type="text"
                  id="dname"
                  required
                  className="form-control"
                  value={dept.dname}
                  onChange={handleInputChange}
                  placeholder="dname"
                  name="dname"
                />
              </div>
            </div>
            {/* 부서명 입력창 끝 */}
            
            {/* 부서위치 입력창 시작 */}
            <div className="row g-3 align-items-center mb-3">
              <div className="col-3">
                <label htmlFor="loc" className="col-form-label">
                  Loc
                </label>
              </div>
              <div className="col-9">
                <input
                  type="text"
                  id="loc"
                  required
                  className="form-control"
                  value={dept.loc}
                  onChange={handleInputChange}
                  placeholder="loc"
                  name="loc"
                />
              </div>
            </div>
            {/* 부서위치 입력창 끝 */}

            {/* 저장버튼 시작 */}
            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={saveDept}
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

export default AddDeptNop;
