// 상세조회 + 수정/삭제

import React from "react";
import TitleCom from "../../components/common/TitleCom";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import IDept from "../../types/IDept";
import { useEffect } from 'react';
import DeptService from "../../services/DeptService";
import { dark } from "@mui/material/styles/createPalette";
import { data } from "jquery";

function DeptNop() {
  // TODO : 전체 조회 페이지에서 보내준 기본키 정보 받기
  // TODO : useParams(); -> url/기본키(dno)정보를 받게하는 함수
  const { dno } = useParams();
  // TODO : 강제 페이지 이동 함수
  let navigate = useNavigate();

  // TODO : 변수 정의
  // 객체 초기화
  const initialDept = {
    dno: null,
    dname: "",
    loc: "",
  };
  // TODO : 수정될 부서 객체 변수
  const [dept, setDept] = useState<IDept>(initialDept);
  // TODO : 화면에서 수정 성공/실패 메세지 변수
  const [message, setMessage] = useState<String>("");

  // TODO : 함수 정의
  // TODO : 화면이 뜰 때 실행되는 이벤트 함수 + dno 값 감시
  // 사용법 : useEffect(()=>{실행문},[변수명]);
  useEffect(()=>{
    // dno 있으면 상세조회 실행
    if(dno) getDept(dno);
  },[dno]);

  // TODO : 상세조회
  const getDept = (dno:string) => { 
     DeptService.get(dno) // 벡엔드에 상세조회 요청
     .then((response:any)=>{
      // 백엔드 결과 -> 부서객체에 저장
      setDept(response.data);
     })
     .catch((e:Error)=>{
      console.log(e);
     })
   }
  
  // TODO : 입력창 수동 바인딩 함수
  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => { 
    const {name, value} = event.target; // 화면값 [이름]
    // 화면값 -> Dept 객체의 속성에 저장
    setDept({...dept, [name]: value});
  }

  // TODO : 수정 함수
  const updateDept = () => { 
    DeptService.update(dept.dno, dept) // 벡엔드 수정요청
    .then((response)=>{
      console.log(response.data);
      setMessage("부서정보가 수정되었습니다.")
    })
    .catch((e:Error)=> {
      console.log(e);
    })

  }

  // TODO : 삭제 함수
  const deleteDept = () => { 
    DeptService.remove(dept.dno)
    .then((response) => {
      console.log(response.data);
      navigate("/dept-nop");
    })
    .catch((e:Error) => {
      console.log(e);
    })
   }
 
  
  return (
    <>
      {/* 제목 start */}
      <TitleCom title="DeptNop Detail No Page" />
      {/* 제목 end */}

      <>
        {dept ? (
          <div className="col-6 mx-auto">
            {/* 입력창 */}
            <form>
              {/* 부서명 입력창 시작 */}
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
            </form>
            {/* 부서위치 입력창 끝 */}

            {/* 삭제 / 수정 버튼 시작 */}
            <div className="row g-3 mt-3 mb-3">
              <button
                onClick={deleteDept}
                className="btn btn-outline-danger ms-3 col"
              >
                Delete
              </button>

              <button
                type="submit"
                onClick={updateDept}
                className="btn btn-outline-success ms-2 col"
              >
                Update
              </button>
            </div>
            {/* 삭제 수정 버튼 끝 */}

            {/* 수정버튼 성공메세지 출력 */}
            <p>{message}</p>
          </div>
        ) : (
          <div className="col-6 mx-auto">
            <br />
            <p>Please click on a DeptNop...</p>
          </div>
        )}
      </>
    </>
  );
}

export default DeptNop;
