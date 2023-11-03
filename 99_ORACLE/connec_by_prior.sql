-- 계층형 쿼리 : level 의사컬럼(ex: 부모 0 ~ 1,2,3...)
SELECT BID AS bid,
       LPAD('*', (LEVEL-1)) || board_title AS boardTitle,
       board_content AS boardContent,
       board_writer AS boardWriter,
       view_cnt AS viewCnt,
       board_group AS boardGroup,
       board_parent As boardParent
FROM TB_REPLY_BOARD
WHERE BOARD_TITLE LIKE '%%'
AND DELETE_YN = 'N'
START WITH BOARD_PARENT = 0 -- 부모컬럼 최초값(0)부터 시작
CONNECT BY PRIOR BID = BOARD_PARENT -- 게시판 번호와 부모 번호를 연관관계 -> 계층형으로 관계를 만들어줌
ORDER SIBLINGS BY BOARD_GROUP DESC;

SELECT TID AS tid,
       LPAD('*', (LEVEL-1)) || subject AS subject,
       main_text AS mainText,
       writer AS writer,
       views AS views,
       tgroup AS tgroup,
       tparent AS tparent
FROM TB_THREAD_BOARD
WHERE SUBJECT LIKE '%%'
AND DELETE_YN = 'N'
START WITH TPARENT = 0
CONNECT BY PRIOR TID = TPARENT
ORDER SIBLINGS BY TGROUP DESC;
       
-- INSERT 문(BID, BOARD_TITLE, BOARD_CONTNET, BOARD_WRITER,
--           VIEW_CNT, BOARD_GROUP, BOARD_PARENT, DELTE_YN, INSERT_TIME, UPDATE_TIME, DELETE_TIME)
INSERT INTO TB_REPLY_BOARD
VALUES(sq_reply_board.nextval, '제목', '내용', '홍길동', 0, sq_reply_board.CURRVAL,
       0, 'N', TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS'), NULL, NULL);
       

INSERT INTO TB_THREAD_BOARD
VALUES(sq_thread_board.nextval, '제목', '내용', '홍길동', 0, sq_thread_board.CURRVAL,
       0, 'N', TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS'), NULL, NULL);
       rollback;
       
UPDATE TB_REPLY_BOARD
SET DELETE_YN = 'Y',
    DELETE_TIME = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS')
WHERE BOARD_GROUP = 2;
SELECT * FROM TB_REPLY_BOARD;
ROLLBACK;

UPDATE TB_THREAD_BOARD
SET DELETE_YN = 'Y',
    DELETE_TIME = TO_CHAR(SYSDATE, 'YYYY-MM-DD HH24:MI:SS')
WHERE TGROUP = 2;
SELECT * FROM TB_THREAD_BOARD;
ROLLBACK;