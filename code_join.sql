-- 대분류코드(TB_CODE_CATEGORY)
-- 소분류코드(TB_CODE)
-- 조인컬럼 : 공통컬럼(이름이 똑같은 컬럼) = CATEGORY_ID
-- JAVA : DTO(인터페이스) => 컬럼 별명 : 컬럼명 AS 별명
SELECT CO.CODE_ID AS codeId
      ,CO.CODE_NAME AS codeName
      ,CO.CATEGORY_ID AS categoryId
      ,cc.category_name AS categoryName
      ,CO.USE_YN AS useYn
FROM TB_CODE CO
    ,TB_CODE_CATEGORY CC
WHERE CO.CATEGORY_ID = CC.CATEGORY_ID
AND co.code_name LIKE '%%';

-- 1) JOIN LIKE 검색
-- 공통컬럼으로 = 조인 (DTO)
SELECT SC.SCNO AS scno,
       SP.CODE_ID AS codeId,
       SP.TITLE AS title,
       SP.IMG_PATH AS imgPath,
       SP.UNIT_PRICE AS unitPrice,
       SC.CART_COUNT AS cartCount
FROM TB_SIMPLE_CART SC
    ,TB_SIMPLE_PRODUCT SP
WHERE SC.SPNO = SP.SPNO
AND SP.TITLE LIKE '%%'
AND SC.DELETE_YN = 'N';

-- 2) JOIN 상세 검색
SELECT SC.SCNO       AS scno
     , SP.CODE_ID    AS codeId
     , SP.TITLE      as title
     , SP.IMG_PATH   AS imgPath
     , SP.UNIT_PRICE AS unitPrice
     , SC.CART_COUNT AS cartCount
FROM TB_SIMPLE_CART SC
    ,TB_SIMPLE_PRODUCT SP
WHERE SC.SPNO = SP.SPNO
AND  SC.SCNO = 1
AND  SC.DELETE_YN = 'N';

