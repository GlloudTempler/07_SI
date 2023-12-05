import React, { useState } from "react";

function Home() {
  // 변수 정의
  // 화면에 출력할 변수 : localStorage의 객체값
  const [printLocalStorage, setPrintLocalStorage] = useState<string>("");
  const [newTodoItem, setNewTodoItem] = useState<string>("");
  
  // 함수 정의
  // localStorage : 키, 값으로 이루어져 있음(웹브라우저에서 확인 가능)
  // input : 키 이름으로 로컬스토리지에 객체 저장하는 함수
  const addTodoItem = () => {
    // input태그에 값이(키이름) 입력되면
    if(newTodoItem !== "") {
      // 샘플 데이터 : 로컬스토리지에 저장될 객체
      const data = {
        userId: "forbob",
        password: "123456",
        email: "forbob@naver.com",
        roles: "ROLE_ADMIN",
        loggedIn: true,
      };
      // todo : 로컬스토리지에 저장
      // localStorage.setItem(키이름, 값(문자열))
      // 객체를 문자열로 변환하는 함수 -> JSON.stringify()
      localStorage.setItem(newTodoItem, JSON.stringify(data))
    }
  }

  // 로컬스토리지 값 가져오기 함수
  const getTodoItem = () => {
    setPrintLocalStorage(localStorage.getItem(newTodoItem)||"");
  }
  // 로컬스토리지 키 이름으로 삭제
  const delTodoItem = () => {
    localStorage.removeItem(newTodoItem);
  }

  // 화면 지우기
  const clearTodoItem = () => {
    setPrintLocalStorage("");
  }

  // 수동 바인딩
  const newHandleChange = (event:any) => {
    setNewTodoItem(event.target.value);
  }

  return (
    <div className="add">
      <input
        type="text"
        className="form-control m-1"
        placeholder="Enter user"
        value={newTodoItem}
        onChange={newHandleChange}
      />
      <button className="btn btn-primary m-1" onClick={addTodoItem}>
        Add
      </button>
      <button className="btn btn-success m-1" onClick={getTodoItem}>
        Get
      </button>
      <button className="btn btn-danger m-1" onClick={delTodoItem}>
        Remove
      </button>
      <button className="btn btn-info m-1" onClick={clearTodoItem}>
        Clear
      </button>
      {/* // <!-- localStorage의 키의 값 출력 --> */}
      localStorage 값 : {printLocalStorage}
    </div>
  );
}

export default Home;
