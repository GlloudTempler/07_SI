import React, { useState } from "react";
import TitleCom from "../../components/common/TitleCom";
import IFileDb from "../../types/advanced/IFileDb";
import FileDbService from "../../services/advanced/FileDbService";

function AddFileDb() {
  // 변수 정의
  // 객체 초기화
  const initialFileDb = {
    uuid: null,
    fileTitle: "",
    fileContent: "",
    fileUrl: "",
  };

  // 부서 객체
  const [uploadFileDb, setUploadFileDb] = useState<IFileDb>(initialFileDb);
  // 화면에 성공 / 실패 메세지 찍기 변수
  const [message, setMessage] = useState<String>("");
  // TODO : 현재 선택한 파일을 저장할 배열 변수
  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  // 함수 정의
  // input 태그에 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target; // 화면값
    setUploadFileDb({ ...uploadFileDb, [name]: value }); // 변수 저장
  };

  // 저장 함수
  const upload = () => {
    // 이미지 파일 : 선택된 이미지 파일 변수
    // 변수명? => 옵셔널체이닝, 변수의 값이 null 이면 udefined 바꾸어줌
    let currentFile = selectedFiles?.[0]; // 첫번째 선택된 파일
    FileDbService.upload(uploadFileDb, currentFile)
    .then((response:any)=>{
        setMessage("파일 업로드 성공!");
        console.log(response.data);
    })
    .catch((e:Error)=> {
        setMessage("실패!")
        console.log(e);
    })
  }

  // todo : 파일 선택 상자에서 이미지 선택 시 실행되는 함수
  // 파일 선택 상자 html 태그 : <input type = "file" />
  const selectFile = (event: any) => { 
    // 화면에서 이미지 선택시 저장된 객체 : event.target.files
    // 변수명 as 타입명 -> 개발자가 변수가 무조건 특정 타입이라고 고정시킨 것 (타입스크립트에서 체크 안함)
    setSelectedFiles(event.target.files as FileList)
   }


  return (
    <>
      {/* 제목 start */}
      <TitleCom title="Add FileDb" />
      {/* 제목 end */}

      <div className="col-6 mx-auto">
        {/* <!-- 이미지명(fileTitle) 입력 박스 시작 --> */}
        <div className="row g-3 align-items-center mb-3">
          <div className="col-3">
            <label htmlFor="fileTitle" className="form-label">
              이미지명
            </label>
          </div>

          <div className="col-9">
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
        </div>
        {/* <!-- 이미지명 입력 박스 끝 --> */}

        {/* <!-- 이미지내용 입력 박스 시작 --> */}
        <div className="row g-3 align-items-center mb-3">
          <div className="col-3">
            <label htmlFor="fileContent" className="form-label">
              내용
            </label>
          </div>

          <div className="col-9">
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
        </div>
        {/* <!-- 이미지내용 입력 박스 끝 --> */}

        <div className="input-group mb-3">
          {/* upload 선택상자/버튼 start */}
          <input
            type="file"
            className="form-control"
            id="inputGroupFile02"
            onChange={selectFile}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="inputGroupFileAddon04"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </button>
        </div>
        {/* upload 선택상자/버튼 end */}

        {/* upload 성공/실패 메세지 출력 시작 */}
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {/* upload 성공/실패 메세지 출력 끝 */}
      </div>
    </>
  );
}

export default AddFileDb;
