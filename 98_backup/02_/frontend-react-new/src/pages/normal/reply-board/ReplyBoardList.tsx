import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import TitleCom from '../../../components/common/TitleCom';
import IReplyBoard from '../../../types/normal/IReplyBoard';
import replyBoardService from '../../../services/normal/ReplyBoardService';

function ReplyBoardList() {
    // 변수 정의
    // replyBoar(게시물+답변) 배열 변수
    // 답변글 1개로 제한
    const [replyBoard, setReplyBoard] = useState<Array<IReplyBoard>>([]);
    // 검색어 변수
    const [searchBoardTitle, setSearchBoardTitle] = useState<string>("");

    // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(3); // 1페이지당개수
    // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
    const pageSizes = [3, 6, 9];
    
    // 함수 정의
    useEffect(() => {
        retrieveReplyBoard();
    }, [page, pageSize])

    // 전체 조회 함수
    const retrieveReplyBoard = () => {
        replyBoardService.getAll(searchBoardTitle, page-1, pageSize)
        .then((response:any) => {
            const {replyBoard, totalPages} = response.data;
            setReplyBoard(replyBoard);
            setCount(totalPages);
            console.log("response", response.data);
        })
        .catch((e: Error)=> {
            console.log(e);
        })
    }

    // 수동 바인딩 함수
    // 검색어 수동 바인딩
    const onChangeSearchBoardTitle = (e: any) => {
        setSearchBoardTitle(e.target.value);
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

    // ----------------------------------------------------

    // todo : reply관련
    // reply 변수 정의
    // reply 객체 초기화
    const initialReply = {
        bid: null,
        boardTitle: "",
        boardContent: "",
        boardWriter: "",
        viewCnt: 0,
        boardGroup: null,
        boardParent: 0
    }

    const [reply, setReply] = useState(initialReply);
    // reply 버튼 클릭시 상태 저장할 변수 : true / false
    const [replyClicked, setReplyClicked] = useState(false);

    // TODO : reply 함수 정의
    // 수동 바인딩 함수
    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setReply({...reply, [name]: value});
    }

    // 답변글 생성함수
    const saveReply = () => {
        let data = {
            boardTitle: reply.boardTitle,
            boardContent: reply.boardContent,
            boardWriter: reply.boardWriter,
            viewCnt: 0,
            // 그룹번호(부모글 === 자식글)
            // rule 1) 부모글 최초 생성 또는 답변글 없을 때 0 저장
            //      2) 답변글 있으면 부모글 게시판번호(bid) 저장
            boardGroup: reply.bid,
            // 부모글 번호 : 
            // rule: : 1) 부모글 최초생성 또는 답변글 없을 때 자신의 게시판 번호(bid) 저장
            //         2) 답변글 생성이면 부모글번호(bid)
            boardParent: reply.bid
        };

        replyBoardService.create(data)
        .then((response:any)=> {
            alert("답변글이 생성되었습니다.")
            // 전체 재조회
            retrieveReplyBoard();
            console.log(response.data);
        })
        .catch((e:Error)=> {
            console.log(e);
        })
    }

    // 게시물 reply버튼 클릭시 화면에 답변 입력창 보이게 하는 함수
    const newReply = (data:any) => {
        // 데이터를 수정
        setReply({...data, boardContent:""})
        // 답변 입력창 
        setReplyClicked(true);
    }

    // 답변 입력창 숨기기
    const closeReply = () => {
        setReplyClicked(false);
    }


  return (
    <div>
    {/* 제목 start */}
    <TitleCom title="Reply Board List" />
    {/* 제목 end */}

    {/* search start - 검색어 입력창 */}
    <div className="row mb-5 justify-content-center">
      <div className="col-12 w-50 input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchBoardTitle}
          onChange={onChangeSearchBoardTitle}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={retrieveReplyBoard}
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
            <th scope="col">board Title</th>
            <th scope="col">board Content</th>
            <th scope="col">board Writer</th>
            <th scope="col">view Cnt</th>
            <th scope="col">reply</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {replyBoard &&
            replyBoard.map((data, index) => (
              // 키값 추가 않하면 react 에서 경고를 추가 : 키는 내부적으로 리액트가 rerending 할때 체크하는 값임
              <tr key={index}>
                <td>{data.bid}</td>
                <td>{data.boardTitle}</td>
                <td>{data.boardContent}</td>
                <td>{data.boardWriter}</td>
                <td>{data.viewCnt}</td>
                <td>
                    {/* 클릭 시 아래 답변 폼이 열림 */}
                  {data.boardParent == 0 && (
                    <Link to={"#"}>
                      <span
                        className="badge bg-warning"
                        // 리액트 : onClick={()=>함수명} == 매개변수가 있을 시
                        onClick={() => newReply(data)}
                        // onClick={newReply} -> 매개변수가 없을 시
                      >
                        Reply
                      </span>
                    </Link>
                  )}
                </td>
                <td>
                    {/* 상세화면 이동 */}
                  <Link
                    to={
                      "/reply-board/bid/" +
                      data.bid +
                      "/boardParent/" +
                      data.boardParent
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

      {/* reply form start - 답변글 */}
      <div>
        {/* 변수명 && 태그 : 변수명 = true 태그가 보임 */}
        {/* 변수명 && 태그 : 변수명 = false 태그가 안보임 */}
        {replyClicked && (
          <div className="col-md-12 row">
            <div className="col-md-12 row mt-2">
              <label htmlFor="bid" className="col-md-2 col-form-label">
                bid
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="bid"
                  placeholder={reply.bid || ""}
                  disabled
                  name="bid"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label htmlFor="boardTitle" className="col-md-2 col-form-label">
                board Title
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control-plaintext"
                  id="boardTitle"
                  disabled
                  placeholder={reply.boardTitle}
                  name="boardTitle"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label
                htmlFor="boardContent"
                className="col-md-2 col-form-label"
              >
                board Content
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="boardContent"
                  required
                  value={reply.boardContent}
                  onChange={handleInputChange}
                  name="boardContent"
                />
              </div>
            </div>

            <div className="col-md-12 row mt-2">
              <label
                htmlFor="boardWriter"
                className="col-md-2 col-form-label"
              >
                board Writer
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  id="boardWriter"
                  required
                  value={reply.boardWriter}
                  onChange={handleInputChange}
                  name="boardWriter"
                />
              </div>
            </div>

            <div className="row px-4 mt-2">
              <button
                onClick={saveReply}
                className="btn btn-success mt-3 col-md-5"
              >
                Submit
              </button>
              <div className="col-md-2"></div>

              <button
                onClick={closeReply}
                className="btn btn-danger mt-3 col-md-5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      {/* reply form end */}
    </div>
  </div>
  )
}

export default ReplyBoardList