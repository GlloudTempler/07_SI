import React from "react";
// app css import
import "./assets/css/app.css";

import HeaderCom from "./components/common/HeaderCom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/common/NotFound";
import DeptListNop from "./pages/dept-nop/DeptListNop";
import EmpListNop from "./pages/emp-nop/EmpListNop";
import AddDeptNop from "./pages/dept-nop/AddDeptNop";
import AddEmpNop from "./pages/emp-nop/AddEmpNop";
import DeptNop from "./pages/dept-nop/DeptNop";
import EmpNop from "./pages/emp-nop/EmpNop";

function App() {
  return (
    <div className="App">
      <HeaderCom />

      {/* <!-- 구분 막대 시작 --> */}
      <div className="gutter text-center text-muted fade-in-box">
        <div>클론 코딩 예제 사이트에 오신 것을 환영합니다.</div>
      </div>
      {/* <!-- 구분 막대 끝 --> */}

      <div id="content-wrapper">
        {/* 라우터 정의 시작 */}
        <Routes>
          {/* login */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* dept */}
          <Route path="/dept-nop" element={<DeptListNop/>} />
          <Route path="/add-dept-nop" element={<AddDeptNop/>} />
          <Route path="/dept-nop/:dno" element={<DeptNop/>} />
          
          {/* TODO: 사원 전체 조회 페이지를 만들고 (/emp-nop) 화면에 출력하세요(부서) */}
          {/* 1) types - IEmp.ts
              2) 서비스 - empservice.ts(axios)
              3) emp-nop - EmpListNop.tsx */}
          <Route path="/emp-nop" element={<EmpListNop/>} />
          {/* 연습 2) 사원에 사원추가페이지를 완성하세요
              AddEmpNop.tsx (추가페이지)
              Route 추가페이지 메뉴달기
              벡엔드(서비스/컨트롤러 저장함수 만들기) */}
          <Route path="/add-emp-nop" element={<AddEmpNop/>} />
          {/* 연습 3) 사원에 수정/상세조회 기능 추가 */}
          <Route path="/emp-nop/:eno" element={<EmpNop/>} />

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* 라우터 정의 끝 */}
      </div>
    </div>
  );
}

export default App;
