import React, { useEffect, useState } from 'react'
import TitleCom from '../../../components/common/TitleCom'
import { useNavigate, useParams } from 'react-router-dom';
import IThreadBoard from '../../../types/normal/IThreadBoard';
import threadBoardService from '../../../services/normal/ThreadBoardService';

function ThreadBoard() {
  // 전체 조회 페이지에서 전송한 기본키
  const { tid, tparent } = useParams();
  // 강제 페이지 이동
  let navigate = useNavigate();

  // 객체 초기화
  const initialThreadBoard = {
    tid: null,
    subject: "",
    mainText: "",
    writer: "",
    views: 0,
    tgroup: null,
    tparent: 0,
  };

  // 수정될 replyBoard 객체
  const [threadBoard, setThreadBoard] = useState<IThreadBoard>(initialThreadBoard);
  // 화면에 수정 성공 메세지 표시
  const [message, setMessage] = useState<string>("");

  // todo : 함수정의
  // 상세 조회 함수
  const getThreadBoard = (tid: string) => {
    threadBoardService
      .get(tid)
      .then((response: any) => {
        setThreadBoard(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰 때 실행되는 이벤트
  useEffect(() => {
    if (tid) getThreadBoard(tid);
  }, [tid]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setThreadBoard({ ...threadBoard, [name]: value });
  };

  // 수정 함수
  const updateThreadBoard = () => {
    threadBoardService
      .update(threadBoard.tid, threadBoard)
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
  const deleteThreadBoard = () => {
    threadBoardService
      .removeBoard(threadBoard.tgroup)
      .then((response: any) => {
        console.log(response.data);
        navigate("/thread-board");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 게시물만 삭제
  const deleteThread = () => {
    threadBoardService.remove(threadBoard.tid)
    .then((response:any) => {
      console.log(response.data);
      navigate("/thread-board")
    })
    .catch((e:Error)=> {
      console.log(e);
    })
  }
  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Thread Board Detail" />
      {/* 제목 end */}

      <>
        {threadBoard ? (
          <div className="col-6 mx-auto">
            <form>
              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="subject" className="col-form-label">
                    Subject
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="subject"
                    required
                    className="form-control"
                    value={threadBoard.subject}
                    onChange={handleInputChange}
                    placeholder="subject"
                    name="subject"
                    disabled={tparent != "0" ? true : false}
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="mainText" className="col-form-label">
                    MainText
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="mainText"
                    required
                    className="form-control"
                    value={threadBoard.mainText}
                    onChange={handleInputChange}
                    placeholder="mainText"
                    name="mainText"
                  />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className="col-3">
                  <label htmlFor="writer" className="col-form-label">
                    Writer
                  </label>
                </div>

                <div className="col-9">
                  <input
                    type="text"
                    id="writer"
                    required
                    className="form-control"
                    value={threadBoard.writer}
                    onChange={handleInputChange}
                    placeholder="writer"
                    name="writer"
                  />
                </div>
              </div>
            </form>

            {/* boardParent "0" 아니면 답변글임 */}
            <div className="row g-3 mt-3 mb-3">
              {tparent != "0" ? (
                <button
                  className="btn btn-outline-primary ms-3 col"
                  onClick={deleteThread}
                >
                  Delete
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger ms-3 col"
                  onClick={deleteThreadBoard}
                >
                  Delete
                </button>
              )}

              <button
                type="submit"
                className="btn btn-outline-success ms-2 col"
                onClick={updateThreadBoard}
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
            <p>Please click on a Thread Board...</p>
          </div>
        )}
      </>
    </>
  )
}

export default ThreadBoard