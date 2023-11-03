export default interface IReplyBoard {
    bid?: any | null,
    boardTitle: string,
    boardContent: string,
    boardWriter: string,
    viewCnt: number | string,
    boardGroup: any | null,
    boardParent: any | null
}