export default interface IProduct {
//     PNO         NUMBER NOT NULL
//     CONSTRAINT PK_PRODUCT PRIMARY KEY, -- 상품번호
// KIND_CODE   NUMBER,                    -- 상품종류코드
// PNAME       VARCHAR2(255),             -- 상품명
// IMAGE       VARCHAR2(255),             -- 이미지 경로
// UNIT_PRICE  NUMBER,                    -- 단가
// STATUS_CODE NUMBER DEFAULT 20001,      -- 상품상태코드(20001(신상), 20002(이월상품), 20003(전시품))
// USE_YN      VARCHAR2(1) DEFAULT 'Y'    -- 사용여부


    pno?: any | null,
    kindCode: number,
    pname: string,
    image: string,
    unitPrice: number,
    statusCode: number,
    useYn: string
}