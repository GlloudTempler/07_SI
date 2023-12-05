export default interface IFileDb {
  //     UUID         VARCHAR2(1000) NOT NULL
  // FILE_TITLE   VARCHAR2(1000),           -- 제목
  // FILE_CONTENT VARCHAR2(1000),           -- 내용
  // FILE_URL     VARCHAR2(1000),           -- 파일 다운로드 URL

  uuid?: any | null, // 기본키(범용적으로 유일한 값을 만들어주는 값)
  fileTitle: string, // 제목
  fileContent: string, // 내용
  fileUrl: string // 파일다운로드 url
}
