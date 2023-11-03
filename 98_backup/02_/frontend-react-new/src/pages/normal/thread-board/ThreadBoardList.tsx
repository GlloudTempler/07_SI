import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom'
import { Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import IThreadBoard from '../../../types/normal/IThreadBoard'
import threadBoardService from '../../../services/normal/ThreadBoardService'

function ThreadBoardList() {
    // 변수 정의
    // threadBoard 배열 변수
    const [threadBoard, setThreadBoard] = useState<Array<IThreadBoard>>([]);
    // 검색어 변수
    const [searchSubject, setSearchSubject] = useState<string>("");

    // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
    // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
    const pageSizes = [3, 6, 9];

    // 함수 정의
    useEffect(()=> {
        retrieveThreadBoard();
    }, [page, pageSize]);

    // 전체 조회 함수
    const retrieveThreadBoard = () => {
        threadBoardService.getAll(searchSubject, page-1, pageSize)
        .then((response:any)=> {
            const {threadBoard, totalPages} = response.data;
            setThreadBoard(threadBoard);
            setCount(totalPages);
            console.log("response", response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    // 수동 바인딩 함수
    // 검색어 수동 바인딩
    const onChangeSearchSubject = (e: any) => {
        setSearchSubject(e.target.value);
    }

    // todo: handlePageSizeChange(공통) : pageSize 값 변경시 실행되는 함수
    //  select 태그 수동 바인딩 : 화면값 -> 변수에 저장
    const handlePageSizeChange = (event: any) => { 
        setPageSize(event.target.value); // 1페이지당 개수저장(3,6,9)
        setPage(1); // 현재페이지번호 : 1로 강제설정
    }

    //  todo: Pagination 수동 바인딩(공통)
    //  페이지 번호를 누르면 => page 변수에 값 저장
    const handlePageChange = (event:any, value:number) => { 
        // value == 화면의 페이지번호
        setPage(value);
    }
    
    // ----------------------
    // TODO : thread 관련
    // thread 변수 초기화
    const initialThread = {
        tid: null,
        subject: "",
        mainText: "",
        writer: "",
        views: 0,
        tgroup: null,
        tparent: 0
    }

    const [thread, setThread] = useState(initialThread);
    // thread 버튼 클릭시 상태 저장 변수 : true/false
    const [threadClicked, setThreadClicked] = useState(false);

    // TODO : thread 함수 정의
    // 수동 바인딩 함수
    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setThread({...thread, [name]: value});
    }

    // thread 생성 함수
    // 임시 객체
    const saveThread = () => {
        let data ={
            subject: thread.subject,
            mainText: thread.mainText,
            writer: thread.writer,
            views: 0,
            tgroup: thread.tid,
            tparent: thread.tid
        };

        threadBoardService.create(data)
        .then((response:any)=> {
            alert("thread가 생성되었습니다.")
            retrieveThreadBoard();
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    const newThread = (data:any) => {
        setThread({...data, mainText:""})
        setThreadClicked(true);
    }

    const closeThread = () => {
        setThreadClicked(false);
    }


  return (
<div>
    {/* 제목 start */}
    <TitleCom title="Thread Board List" />
    {/* 제목 end */}

    {/* search start - 검색어 입력창 */}
    <div className="row mb-5 justify-content-center">
      <div className="col-12 w-50 input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by subject"
          value={searchSubject}
          onChange={onChangeSearchSubject}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={retrieveThreadBoard}
        >
          Search
        </button>
      </div>
    </div>
    {/* search end */}

    {/* page start - 페이지 번호 */}
    <div className="mt-3">
      {"Items per Page: "}
      <select onChange={handlePageSizeChange} value={pageSize}>
        {pageSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <Pagination
        className="my-3"
        count={count}
        page={page}
        siblingCount={1}
        boundaryCount={1}
        variant="outlined"
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
    {/* page end */}

    {/* 게시판 + 답변글(폼2) */}
    <div className="col-md-12">
      {/* table start - 게시판 본문 */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">board No</th>
            <th scope="col">Subject</th>
            <th scope="col">Main Text</th>
            <th scope="col">Writer</th>
            <th scope="col">views</th>
            <th scope="col">Thread</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {threadBoard &&
            threadBoard.map((data, index) => (
              // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
              <tr key={index}>
                <td>{data.tid}</td>
                <td>{data.subject}</td>
                <td>{data.mainText}</td>
                <td>{data.writer}</td>
                <td>{data.views}</td>
                <td>
                    {/* 클릭 시 아래 답변 폼이 열림 */}
                  {data.tparent == 0 && (
                    <Link to={"#"}>
                      <span
                        className="badge bg-warning"
                        // 리액트 : onClick={()=>함수명} == 매개변수가 있을 시
                        onClick={() => newThread(data)}
                        // onClick={newReply} -> 매개변수가 없을 시
                      >
                        Thread
                      </span>
                    </Link>
                  )}
                </td>
                <td>
                    {/* 상세화면 이동 */}
                  <Link
                    to={
                      "/thread-board/tid/" +
                      data.tid +
                      "/tparent/" +
                      data.tparent
                    }
                  >
                    <span className="badge bg-success">Edit</span>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* table end */}

      {/* thread form start - 답변글 */}
      <div>
        {/* 변수명 && 태그 : 변수명 = true 태그가 보임 */}
        {/* 변수명 && 태그 : 변수명 = false 태그가 안보임 */}
        {threadClicked && (
          <div className="col-md-12 row">
            <div className="col-md-12 row mt-2">
              <label htmlFor="tid" className="col-md-2 col-form-label">
                tid
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="tid"
                  placeholder={thread.tid || ""}
                  disabled
                  name="tid"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label htmlFor="subject" className="col-md-2 col-form-label">
                subject
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="subject"
                  disabled
                  placeholder={thread.subject}
                  name="subject"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label
                htmlFor="mainText"
                className="col-md-2 col-form-label"
              >
                main text
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="mainText"
                  required
                  value={thread.mainText}
                  onChange={handleInputChange}
                  name="mainText"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label
                htmlFor="writer"
                className="col-md-2 col-form-label"
              >
                Writer
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="writer"
                  required
                  value={thread.writer}
                  onChange={handleInputChange}
                  name="writer"
                />
              </div>
            </div>

            <div className="row px-4 mt-2">
              <button
                onClick={saveThread}
                className="btn btn-success mt-3 col-md-5"
              >
                Submit
              </button>
              <div className="col-md-2"></div>

              <button
                onClick={closeThread}
                className="btn btn-danger mt-3 col-md-5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* thread form end */}
    </div>
  </div>
  )
}

export default ThreadBoardList