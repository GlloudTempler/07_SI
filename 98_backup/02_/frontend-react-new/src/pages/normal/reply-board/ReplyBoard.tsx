import React, { useEffect, useState } from "react";
import TitleCom from "../../../components/common/TitleCom";
import { useNavigate, useParams } from "react-router-dom";
import IReplyBoard from "../../../types/normal/IReplyBoard";
import replyBoardService from "../../../services/normal/ReplyBoardService";

function ReplyBoard() {
  // 전체 조회 페이지에서 전송한 기본키
  const { bid, boardParent } = useParams();
  // 강제 페이지 이동
  let navigate = useNavigate();

  // 객체 초기화
  const initialReplyBoard = {
    bid: null,
    boardTitle: "",
    boardContent: "",
    boardWriter: "",
    viewCnt: 0,
    boardGroup: null,
    boardParent: 0,
  };

  // 수정될 replyBoard 객체
  const [replyBoard, setReplyBoard] = useState<IReplyBoard>(initialReplyBoard);
  // 화면에 수정 성공 메세지 표시
  const [message, setMessage] = useState<string>("");

  // todo : 함수정의
  // 상세 조회 함수
  const getReplyBoard = (bid: string) => {
    replyBoardService
      .get(bid)
      .then((response: any) => {
        setReplyBoard(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰 때 실행되는 이벤트
  useEffect(() => {
    if (bid) getReplyBoard(bid);
  }, [bid]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReplyBoard({ ...replyBoard, [name]: value });
  };

  // 수정 함수
  const updateReplyBoard = () => {
    replyBoardService
      .update(replyBoard.bid, replyBoard)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The ReplyBoard was update successfully");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 삭제 함수 : 게시물 + 답변글 2개 삭제(그룹번호 삭제)
  // 그룹번호(boardGroup) : 부모글 번호 == 자식글 번호
  const deleteReplyBoard = () => {
    replyBoardService
      .removeBoard(replyBoard.boardGroup)
      .then((response: any) => {
        console.log(response.data);
        navigate("/reply-board");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 게시물만 삭제
  const deleteReply = () => {
    replyBoardService.remove(replyBoard.bid)
    .then((response:any) => {
      console.log(response.data);
      navigate("/reply-board")
    })
    .catch((e:Error)=> {
      console.log(e);
    })
  }



  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Reply Board Detail" />
      {/* 제목 end */}

      <>
        {replyBoard ? (
          <div className="col-6 mx-auto">
            <form>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="boardTitle" className="col-form-label">
                    boardTitle
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="boardTitle"
                    required
                    className="form-control"
                    value={replyBoard.boardTitle}
                    onChange={handleInputChange}
                    placeholder="boardTitle"
                    name="boardTitle"
                    disabled={boardParent != "0" ? true : false}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="boardContent" className="col-form-label">
                    boardContent
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="boardContent"
                    required
                    className="form-control"
                    value={replyBoard.boardContent}
                    onChange={handleInputChange}
                    placeholder="boardContent"
                    name="boardContent"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="boardWriter" className="col-form-label">
                    boardWriter
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="boardWriter"
                    required
                    className="form-control"
                    value={replyBoard.boardWriter}
                    onChange={handleInputChange}
                    placeholder="boardWriter"
                    name="boardWriter"
                  />
                </div>
              </div>
            </form>

            {/* boardParent "0" 아니면 답변글임 */}
            <div className="row g-3 mt-3 mb-3">
              {boardParent != "0" ? (
                <button
                  className="btn btn-outline-primary ms-3 col"
                  onClick={deleteReply}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger ms-3 col"
                  onClick={deleteReplyBoard}
                >
                  Delete
                </button>
              )}

              <button
                type="submit"
                className="btn btn-outline-success ms-2 col"
                onClick={updateReplyBoard}
              >
                Update
              </button>
            </div>

            {message && (
              <p className="alert alert-success mt-3 text-center">{message}</p>
            )}
          </div>
        ) : (
          <div className="col-6 mx-auto">
            <br />
            <p>Please click on a Reply Board...</p>
          </div>
        )}
      </>
    </>
  );
}

export default ReplyBoard;
