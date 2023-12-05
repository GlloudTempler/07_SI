// axios 공통 함수 : 벡엔드 연동
import IFileDb from "../../types/advanced/IFileDb";
import http from "../../utils/http-common";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지 당 개수))
const getFiles = (
  fileTitle: string,
  page: number,
  size: number
): Promise<any> => {
  return http.get(
    `/advanced/fileDb?fileTitle=${fileTitle}&page=${page}&size=${size}`
  );
};

// 상세 조회
const getFileDb = (uuid: any): Promise<any> => {
  return http.get(`/advanced/fileDb/get/${uuid}`);
};

// 저장 함수
// updateFileDb : 제목 + 타이틀 속성 가진 객체
// fileDb : 실제 이미지(첨부파일)
// FormData 객체 이용 -> 백엔드로 전송
const upload = (updateFileDb: IFileDb, fileDb: any):Promise<any> => {
  // formdata 객체 생성 : map자료구조와 유사(키, 값)
  let formData = new FormData();
  formData.append("fileTitle", updateFileDb.fileTitle);
  formData.append("fileContent", updateFileDb.fileContent);
  formData.append("fileDb", fileDb); // 첨부파일

  return http.post("/advanced/fileDb/upload", formData,{
    headers: {
        "Content-Type": "multipart/form-data"
    }
  });
};

// 수정 함수
const updateFileDb = (uploadFileDb:IFileDb, fileDb:any): Promise<any> => {

    console.log("update() parameter ; ", uploadFileDb);
  
    let formData = new FormData();
  
    formData.append("fileTitle", uploadFileDb.fileTitle);
    formData.append("fileContent", uploadFileDb.fileContent);
    formData.append("fileDb", fileDb);
  
    /* 이부분만 다름 */
    return http.put(`/advanced/fileDb/${uploadFileDb.uuid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
  };

// 삭제 함수
const deleteFile = (uuid: any) => {
  return http.delete<any>(`/advanced/fileDb/deletion/${uuid}`);
};

const FileDbService = {
  getFiles,
  getFileDb,
  upload,
  updateFileDb,
  deleteFile,
};

export default FileDbService;
