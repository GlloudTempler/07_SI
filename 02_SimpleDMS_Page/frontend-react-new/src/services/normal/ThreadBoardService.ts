import IThreadBoard from "../../types/normal/IThreadBoard"
import http from "../../utils/http-common"

// 전체 조회
const getAll = (subject: string, page: number, size:number) => {
    return http.get<Array<IThreadBoard>>(`/normal/thread-board?subject=${subject}&page=${page}&size=${size}`);
}

// 상세 조회
const get = (tid:any) => {
    return http.get<IThreadBoard>(`normal/thread-board/${tid}`)
}

// 저장 함수 - thread
const createThread = (data:IThreadBoard) => {
    return http.post<IThreadBoard>("normal/thread-board", data);
}

// 저장 함수 - 자식글
const create = (data:IThreadBoard) => {
    return http.post<IThreadBoard>("normal/thread", data);
}

// 수정 함수
const update = (tid:any, data:IThreadBoard) => {
    return http.put<any>(`/normal/thread-board/${tid}`, data);
}

// 삭제함수
const removeBoard = (tgroup:any) => {
    return http.delete<any>(`/normal/thread-board/deletion/${tgroup}`);
}

// 삭제함수 : 자식 삭제
const remove = (tid:any) => {
    return http.delete<any>(`/normal/thread/deletion/${tid}`);
}

const threadBoardService = {
    getAll,
    get,
    create,
    update,
    remove,
    createThread,
    removeBoard
}

export default threadBoardService;