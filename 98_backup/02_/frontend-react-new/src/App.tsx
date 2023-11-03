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
import DeptList from "./pages/basic/dept/DeptList";
import EmpList from "./pages/basic/emp/EmpList";
import AddDept from './pages/basic/dept/AddDept';
import AddEmp from "./pages/basic/emp/AddEmp";
import Dept from "./pages/basic/dept/Dept";
import Emp from "./pages/basic/emp/Emp";
import QnaList from "./pages/basic/qna/QnaList";
import CustomerList from "./pages/basic/customer/CustomerList";
import AddQna from "./pages/basic/qna/AddQna";
import AddCustomer from "./pages/basic/customer/AddCustomer";
import Qna from "./pages/basic/qna/Qna";
import Customer from "./pages/basic/customer/Customer";
import FaqList from "./pages/normal/faq/FaqList";
import CinemaFaqList from "./pages/normal/cinema/CinemaFaqList";
import AddFaq from "./pages/normal/faq/AddFaq";
import AddCinemaFaq from './pages/normal/cinema/AddCinemaFaq';
import Faq from "./pages/normal/faq/Faq";
import CinemaFaq from "./pages/normal/cinema/CinemaFaq";
import ReplyBoardList from './pages/normal/reply-board/ReplyBoardList';
import ThreadBoardList from "./pages/normal/thread-board/ThreadBoardList";
import AddReplyBoard from "./pages/normal/reply-board/AddReplyBoard";
import ReplyBoard from "./pages/normal/reply-board/ReplyBoard";
import AddThreadBoard from "./pages/normal/thread-board/AddThreadBoard";
import ThreadBoard from "./pages/normal/thread-board/ThreadBoard";

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
          <Route path="/dept" element={<DeptList />} />
          <Route path="/add-dept" element={<AddDept />} />
          <Route path="/dept/:dno" element={<Dept />} />

          {/* emp(연습) */}
          <Route path="/emp" element={<EmpList />} />
          <Route path="/add-emp" element={<AddEmp />} />
          <Route path="/emp/:eno" element={<Emp />} />

          {/* qna */}
          <Route path="/qna" element={<QnaList />} />
          <Route path="/add-qna" element={<AddQna />} />
          <Route path="/qna/:qno" element={<Qna />} />

          {/* customer */}
          <Route path="/customer" element={<CustomerList />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/customer/:cid" element={<Customer />} />

          {/* faq */}
          <Route path="/faq" element={<FaqList />} />
          <Route path="/add-faq" element={<AddFaq />} />
          <Route path="/faq/:no" element={<Faq />} />

          {/* cinema faq */}
          <Route path="/cinema-faq" element={<CinemaFaqList />} />
          <Route path="/add-cinema-faq" element={<AddCinemaFaq />} />
          <Route path="/cinema-faq/:cfno" element={<CinemaFaq />} />

          {/* reply-board */}
          <Route path="/reply-board" element={<ReplyBoardList />} />
          <Route path="/add-reply-board" element={<AddReplyBoard />} />
          {/* 부모 변수 == 0 -> 부모글 */}
          {/* 부모 변수 != 0 -> 자식글 */}
          <Route path="/reply-board/bid/:bid/boardParent/:boardParent" element={<ReplyBoard />} />

          {/* thread-board */}
          <Route path="/thread-board" element={<ThreadBoardList />} />
          <Route path="/add-thread-board" element={<AddThreadBoard />} />
          <Route path="/thread-board/tid/:tid/tparent/:tparent" element={<ThreadBoard />} />
          

          {/* NotFound */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* 라우터 정의 끝 */}
      </div>
    </div>
  );
}

export default App;
