import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IFileDb from "../../types/advanced/IFileDb";
import FileDbService from "../../services/advanced/FileDbService";

function FileDb() {
  // 변수 정의
  // 전체 조회 페이지에서 전송한 기본키(uuid)
  const { uuid } = useParams();

  // 객체 초기화
  const initialFileDb = {
    uuid: null,
    fileTitle: "",
    fileContent: "",
    fileUrl: "",
  };

  // 수정될 부서 객체
  const [uploadFileDb, setUploadFileDb] = useState<IFileDb>(initialFileDb);
  // 화면에 수정 성공 메세지 표시
  const [message, setMessage] = useState<string>("");

  // todo : 이미지 선택 변수
  // TODO : 현재 선택한 파일을 저장할 배열 변수
  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  // 함수정의
  // 상세 조회 함수
  const getFileDb = (uuid: string) => {
    FileDbService.getFileDb(uuid) // 객체 조회
      .then((response: any) => {
        setUploadFileDb(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 화면이 뜰 때 실행되는 이벤트 -> dno 값이 바뀌면 실행
  useEffect(() => {
    if (uuid) getFileDb(uuid);
  }, [uuid]);

  // input 태그 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUploadFileDb({ ...uploadFileDb, [name]: value });
  };

  // 수정함수
  const updateFileDb = () => {
    let currentFile = selectedFiles?.[0];
    FileDbService.updateFileDb(uploadFileDb, currentFile)
      .then((response: any) => {
        console.log(response.data);
        setMessage("파일 업데이트 성공!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // todo : 파일 선택 상자에서 이미지 선택 시 실행되는 함수
  // 파일 선택 상자 html 태그 : <input type = "file" />
  const selectFile = (event: any) => {
    // 화면에서 이미지 선택시 저장된 객체 : event.target.files
    // 변수명 as 타입명 -> 개발자가 변수가 무조건 특정 타입이라고 고정시킨 것 (타입스크립트에서 체크 안함)
    setSelectedFiles(event.target.files as FileList);
  };

  return (
    <div className="edit-form">
      {/* <!-- 이미지명(fileTitle) 입력 박스 시작 --> */}
      <div className="mb-3 col-md-12">
        <label htmlFor="fileTitle" className="form-label">
          이미지명
        </label>
        <input
          type="text"
          className="form-control"
          id="fileTitle"
          required
          name="fileTitle"
          value={uploadFileDb.fileTitle}
          onChange={handleInputChange}
        />
      </div>
      {/* <!-- 이미지명 입력 박스 끝 --> */}

      {/* <!-- 이미지내용 입력 박스 시작 --> */}
      <div className="mb-3 col-md-12">
        <label htmlFor="fileContent" className="form-label">
          내용
        </label>
        <input
          type="text"
          className="form-control"
          id="fileContent"
          required
          name="fileContent"
          value={uploadFileDb.fileContent}
          onChange={handleInputChange}
        />
      </div>

      {/* <!-- 이미지내용 입력 박스 끝 --> */}
      <div className="mb-3 col-md-12">
        <img src={uploadFileDb.fileUrl} className="card-img-top" alt="강의" />
      </div>

      {/* upload 선택상자/버튼 start */}
      <label className="btn btn-default p-0 mb-3 ">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success mb-3 "
        disabled={!selectedFiles}
        onClick={updateFileDb}
      >
        Update
      </button>
      {/* upload 선택상자/버튼 end */}

      {/* upload 성공/실패 메세지 출력 시작 */}
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      {/* upload 성공/실패 메세지 출력 끝 */}
    </div>
  );
}

export default FileDb;
