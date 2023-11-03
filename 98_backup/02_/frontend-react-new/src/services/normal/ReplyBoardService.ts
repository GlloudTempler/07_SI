// axios 공통 crud 함수

import IReplyBoard from "../../types/normal/IReplyBoard";
import http from "../../utils/http-common";

// 전체 조회
const getAll = (boardTitle: string, page:number, size:number) => {
    return http.get<Array<IReplyBoard>>(`/normal/reply-board?title=${boardTitle}&page=${page}&size=${size}`);
}

// 상세 조회
const get = (bid:any) => {
    return http.get<IReplyBoard>(`/normal/reply-board/${bid}`);
}

// 저장 함수 - 게시물 생성(부모글)
const createBoard = (data:IReplyBoard) => {
    return http.post<IReplyBoard>("/normal/reply-board", data);
}

// 저장 함수 - 답변글 생성(자식글)
const create = (data:IReplyBoard) => {
    return http.post<IReplyBoard>("/normal/reply", data);
}

// 수정 함수
const update = (bid:any, data:IReplyBoard) => {
    return http.put<any>(`/normal/reply-board/${bid}`, data);
}

// 삭제 함수 : 게시물(부모글) + 답변글(자식글) 모두 삭제
//            그룹번호 : 게시물과 답변글은 번호가 같음 = 동시 삭제 가능
const removeBoard = (boardGroup:any) => {
    return http.delete<any>(`/normal/reply-board/deletion/${boardGroup}`);
}

// 삭제 함수 : 답변글(자식글) 삭제
const remove = (bid:any) => {
    return http.delete<any>(`/normal/reply/deletion/${bid}`);
}

const replyBoardService = {
    getAll,
    get,
    create,
    update,
    remove,
    createBoard,
    removeBoard
}

export default replyBoardService;